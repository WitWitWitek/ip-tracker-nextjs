import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { coordsActions } from '../../context/coordsSlice'
import { useIpDetails } from '../../hooks/useIpDetails';
import { useYourLocation } from '../../hooks/useYourLocation'

// components 

export default function IpForm() {
    const { setUserPosition } = useYourLocation()
    const { fetchIpDetails, iPerror } = useIpDetails()
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
                    className={`${iPerror ? 'ip-tracker__input-error' : ''} ip-tracker__input`}
                    type="text"
                    placeholder={iPerror ? iPerror : 'Search for any IP address or domain.'}
                    ref={inputValue} 
                />
                <button className='ip-tracker__form-btn' type='submit' onClick={showIpDetails}>
                    <img src="/icon-arrow.svg" alt="" />
                </button>
            </form>
            <button className='ip-tracker__form-btn-user' onClick={showUserPosition} >
                    <img src="/crosshair.svg" alt="crosshair icon" />
            </button>
        </div>
    )
}


