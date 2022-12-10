import { useSession } from "next-auth/react";

export default function DeleteItemBtn({selectedIpObject, deleteHandler}) {
     const { data: session } = useSession()

    const deleteClickHandler = async () => {
        const user = session.user.name
        const ipAddressDataToDelete = {
            user,
            ipAddressData: {...selectedIpObject}
        }
        await deleteHandler(ipAddressDataToDelete);
    }

    return (
        <button className="ip-tracker__user-page-btn" onClick={deleteClickHandler} title='Remove item from favourites.'>
            <img src="/trash-can.svg" alt="delete button icon" title="Delete this ip address from favourites."/>
        </button>
    )
}