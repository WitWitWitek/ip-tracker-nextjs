export default function ShowOnMapBtn({loadToMapHandler}) {
  return (
    <button className="ip-tracker__user-page-btn--show" onClick={loadToMapHandler}>
        <img src="/show-on-map.svg" alt="show on map icon" title="Load to map this ip address." />
    </button>
  )
}
