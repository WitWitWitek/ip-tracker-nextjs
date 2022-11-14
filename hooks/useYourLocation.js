import { useDispatch } from "react-redux"
import { coordsActions } from "../context/coordsSlice"

export const useYourLocation = () => {
    const dispatch = useDispatch()

    const setUserPosition = async () => {
        const userIpResponse = await fetch(`/api/ip-tracker`);
        const userIpData = await userIpResponse.json()
        const { ip, location, isp } = userIpData.data
        
        navigator.geolocation.getCurrentPosition(success => {
            dispatch(coordsActions.updateCoords({
                ip,
                location: {
                    region: location.region,
                    country: location.country,
                    timezone: location.timezone,
                    lat: success.coords.latitude,
                    lng: success.coords.longitude
                },
                isp
            }))
        },
        err => alert(err.message)
        )


        
    }

    return { setUserPosition }
}