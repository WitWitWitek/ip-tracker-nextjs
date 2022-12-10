import { useState } from "react"
import { useDispatch } from "react-redux"
import { coordsActions } from "../context/coordsSlice"

export const useIpDetails = () => {
    const dispatch = useDispatch()
    const [ipError, setIpError] = useState(null)

    const fetchIpDetails = async (ip) => {
            setIpError(null)
            const response = await fetch(`/api/ip-tracker`, {
                method: 'POST',
                body: JSON.stringify(ip),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const wrongResponse = await response.json()
                setIpError(wrongResponse.message || 'Something went wrong.')
                return;
            }
            const { ipData } = await response.json()
            dispatch(coordsActions.updateCoords(ipData))
    }
    
    return {
        fetchIpDetails,
        ipError
    }
}