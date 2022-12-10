import { useEffect } from "react";
import { useColletion } from "../../hooks/useCollection";
import Board from "../Board/Board";


export default function IpItemsList() {
    const { ipData, getItemsFromCollection, deleteItemFromCollection } = useColletion()
    
    useEffect(() => {
      getItemsFromCollection()
    }, [])

    return (  
        <ul className="ip-tracker__user-page-list">
            {!ipData || ipData.length === 0 && (
                <h2>{`You haven't added any ip address to your list so far.`}</h2>
            )}
            {ipData && ipData.map(ipItem => <Board key={ipItem.ip} ipData={ipItem} deleteHandler={deleteItemFromCollection}/>)}
        </ul>
    )
}
