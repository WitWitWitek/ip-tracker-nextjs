import { useState } from "react"
import { useDispatch } from "react-redux"
import { coordsActions } from "../context/coordsSlice"

export const useIpDetails = () => {
    const dispatch = useDispatch()
    const [iPerror, setIpError] = useState(null)

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
            const dataFetched = await response.json()
            const { data } = dataFetched
            console.log(data);
            dispatch(coordsActions.updateCoords(data))
    }
    

        return {
            fetchIpDetails,
            iPerror
        }
}