import Board from "../Board/Board";

export default function IpItemsList({ipData}) {
    return (  
        <ul className="ip-tracker__user-page-list">
            {!ipData || ipData.length === 0 && (
                <h2>{`You haven't added any ip address to your list so far.`}</h2>
            )}
            {ipData && ipData.map(ipItem => <Board key={ipItem.ip} ipData={ipItem}/>)}
        </ul>
    )
}
