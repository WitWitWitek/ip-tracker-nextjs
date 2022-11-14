import { useSession } from "next-auth/react"
import { useColletion } from "../../hooks/useCollection"
import { useSelector } from "react-redux"

export default function AddItemBtn() {
    const currentIpAddressData = useSelector(state => state.coords)
    const { addItemToCollection } = useColletion()
    const { data: session } = useSession()


    const addClickHandler = async () => {
        const user = session.user.name
        const currentIpAddressDataObject = {
            user,
            ipAddressData: {...currentIpAddressData}
        }
        addItemToCollection(currentIpAddressDataObject)
    }

    return (
        <button className="ip-tracker__board-add-item-btn" onClick={addClickHandler} title='Add item to favourites.'>
            <img src="/save.svg" alt="save button icon" />
        </button>
    )
}
