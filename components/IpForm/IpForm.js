import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { coordsActions } from '../../context/coordsSlice'

// components 

export default function IpForm() {
    const coords = useSelector(state => state.coords);
    const dispatch = useDispatch()
    const inputValue = useRef('')
  
    const showIpDetails = async (e) => {
        e.preventDefault()
        const IP = inputValue.current.value
        fetch(`/api/ip-tracker`, {
            method: 'POST',
            body: JSON.stringify(IP),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(dataFetched => {
            console.log(dataFetched);
            const { data } = dataFetched
            dispatch(coordsActions.updateCoords(data));
        })
    }

    const findYourLocation = e => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(success => {
            dispatch(coordsActions.updateCoords({
                ...coords,
                location: {
                    ...coords.location,
                    lat: success.coords.latitude,
                    lng: success.coords.longitude
                },
                isp: 'TEST TEST TEST'
            }))
        })
    }

    return (
        <div className='ip-tracker__form-container'>
            <form className='ip-tracker__form'>
                <input 
                    className='ip-tracker__input'
                    type="text"
                    placeholder='Search for any IP address or domain'
                    ref={inputValue} 
                />
                <button className='ip-tracker__form-btn' type='submit' onClick={showIpDetails}>
                    <img src="/icon-arrow.svg" alt="" />
                </button>
                <button className='ip-tracker__form-btn-user' type='submit' onClick={findYourLocation}>
                    <img src="/crosshair.svg" alt="" />
                </button>
            </form>
        </div>
    )
}


