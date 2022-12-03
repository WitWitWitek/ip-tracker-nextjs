import { useSession } from "next-auth/react";
import { useColletion } from "../../hooks/useCollection";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function DeleteItemBtn({selectedIpObject}) {
    const { deleteItemFromCollection } = useColletion()
    const { data: session } = useSession()
    const { error } = useSelector(state => state.alert)
    const router = useRouter()

    const deleteClickHandler = async () => {
        const user = session.user.name
        const ipAddressDataToDelete = {
            user,
            ipAddressData: {...selectedIpObject}
        }
        await deleteItemFromCollection(ipAddressDataToDelete);
        if (!error) router.reload(window.location.pathname)
    }

    return (
        <button className="ip-tracker__user-page-btn" onClick={deleteClickHandler} title='Remove item from favourites.'>
            <img src="/trash-can.svg" alt="delete button icon" title="Delete this ip address from favourites."/>
        </button>
    )
}