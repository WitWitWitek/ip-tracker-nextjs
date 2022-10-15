export default function Board({data}) {
  return (
    <ul>
        <li>
            <div className="title">ip adress</div>
            <div className="value">{data.ip}</div>
        </li>
        <li>
            <div className="title">location</div>
            <div className="value">{data.location.region}, {data.location.country}</div>
        </li>
        <li>
            <div className="title">timezone</div>
            <div className="value">UTC {data.location.timezone}</div>
        </li>
        <li>
            <div className="title">isp</div>
            <div className="value">{data.isp}</div>
        </li>
    </ul>
  )
}
