import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { coordsActions } from "../../context/coordsSlice";
import AddItemBtn from "../AddItemBtn/AddItemBtn";
import DeleteItemBtn from "../DeleteItemBtn/DeleteItemBtn";

export default function Board({ipData}) {
    const router = useRouter()
    const dispatch = useDispatch()

    const loadToMapHandler = () => {
        dispatch(coordsActions.updateCoords(ipData))
        router.push('/')
    }

    return (
        <ul className='ip-tracker__board'>
            <li className='ip-tracker__board-item'>
                <div className="ip-tracker__board-title">ip adress</div>
                <div className="ip-tracker__board-value">{ipData.ip}</div>
            </li>
            <li className='ip-tracker__board-item'>
                <div className="ip-tracker__board-title">location</div>
                <div className="ip-tracker__board-value">{ipData.location.region}, {ipData.location.country}</div>
            </li>
            <li className='ip-tracker__board-item'>
                <div className="ip-tracker__board-title">timezone</div>
                <div className="ip-tracker__board-value">UTC {ipData.location.timezone}</div>
            </li>
            <li className='ip-tracker__board-item'>
                <div className="ip-tracker__board-title">isp</div>
                <div className="ip-tracker__board-value">{ipData.isp}</div>
            </li>
            {router.pathname.includes('/user/')  && (
                <li className='ip-tracker__board-item'>
                    <button onClick={loadToMapHandler}>load to map</button>
                    <DeleteItemBtn selectedIpObject={ipData} />
                </li>
            )}
            {router.pathname === '/' && <AddItemBtn />}
        </ul>
    )
}
