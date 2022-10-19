export default function Board({data}) {
  return (
    <ul className='ip-tracker__board'>
        <li className='ip-tracker__board-item'>
            <div className="ip-tracker__board-title">ip adress</div>
            <div className="ip-tracker__board-value">{data.ip}</div>
        </li>
        <li className='ip-tracker__board-item'>
            <div className="ip-tracker__board-title">location</div>
            <div className="ip-tracker__board-value">{data.location.region}, {data.location.country}</div>
        </li>
        <li className='ip-tracker__board-item'>
            <div className="ip-tracker__board-title">timezone</div>
            <div className="ip-tracker__board-value">UTC {data.location.timezone}</div>
        </li>
        <li className='ip-tracker__board-item'>
            <div className="ip-tracker__board-title">isp</div>
            <div className="ip-tracker__board-value">{data.isp}</div>
        </li>
    </ul>
  )
}
