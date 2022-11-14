import Board from "../Board/Board";

export default function IpItemsList({ipData}) {
    return (  
        <ul className="ip-tracker__user-page-list">
            {ipData && ipData.map(ipItem => <Board key={ipItem.ip} ipData={ipItem}/>)}
        </ul>
    )
}
