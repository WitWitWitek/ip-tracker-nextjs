import { useRef, useState } from 'react'
import dynamic from "next/dynamic"

// components
import Board from '../Board/Board'
const Map = dynamic(() => import("../Map/Map"), { ssr:false })

export default function IpForm() {
    const inputValue = useRef('')
    const [data, setData] = useState({
        ip: '192.212.174.101',
        location: {
            region: 'Ohio',
            country: 'Netherlands',
            timezone: '01:00',
            lat: 37.48032,
            lng: -122.14888
        },
        isp: 'Dummy Data',
    })
  
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
            const { data } = dataFetched
            setData(data)
        })
    }

    const findYourLocation = e => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(success => {
            setData({
                ...data,
                location: {
                    ...data.location,
                    lat: success.coords.latitude,
                    lng: success.coords.longitude
                }
            })
        })
    }

    return (
        <form>
            <input type="text" ref={inputValue} />
            <button type='submit' onClick={showIpDetails}>Submit</button>
            <button type='submit' onClick={findYourLocation}>Find your location</button>
            <Board data={data} />
            <Map data={data} />
        </form>
    )
}


