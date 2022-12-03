import { useRef } from 'react'
import { useIpDetails } from '../../hooks/useIpDetails';
import { useYourLocation } from '../../hooks/useYourLocation'

export default function IpForm() {
    const { setUserPosition } = useYourLocation()
    const { fetchIpDetails, ipError } = useIpDetails()
    const inputValue = useRef('')
  
    const showIpDetails = e => {
        e.preventDefault()
        const IP = inputValue.current.value
        fetchIpDetails(IP)
        inputValue.current.value = ''
    }
    

   const showUserPosition = () => {
        setUserPosition()
        inputValue.current.value = ''
   }

    return (
        <div className='ip-tracker__form-container'>
            <form className='ip-tracker__form'>
                <input 
                    className={`${ipError ? 'ip-tracker__input-error' : ''} ip-tracker__input`}
                    type="text"
                    placeholder={ipError ? ipError : 'Search for any IP address or domain.'}
                    ref={inputValue} 
                />
                <button 
                    className='ip-tracker__form-btn' 
                    type='submit' 
                    onClick={showIpDetails} 
                    title="Search for any IP address or domain."
                >
                    <img src="/icon-arrow.svg" alt="" />
                </button>
            </form>
            <button className='ip-tracker__form-btn-user' onClick={showUserPosition} title="Find Your location and IP address">
                    <img src="/crosshair.svg" alt="crosshair icon" />
            </button>
        </div>
    )
}


