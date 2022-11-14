import { useSession } from "next-auth/react"
import { useColletion } from "../../hooks/useCollection"
import { useSelector } from "react-redux"

export default function DeleteItemBtn({selectedIpObject}) {
    const { deleteItemFromCollection } = useColletion()
    const { data: session } = useSession()


    const deleteClickHandler = async () => {
        const user = session.user.name
        const ipAddressDataToDelete = {
            user,
            ipAddressData: {...selectedIpObject}
        }
        deleteItemFromCollection(ipAddressDataToDelete)
    }

    return (
        <button onClick={deleteClickHandler} title='Remove item from favourites.'>Delete</button>
    )
}