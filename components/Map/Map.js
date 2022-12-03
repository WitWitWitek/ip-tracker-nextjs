import { MapContainer, TileLayer, useMap, Popup, Marker, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import { useSelector } from 'react-redux';

function getIcon(_iconSize = 20) {
  return L.icon({
    iconUrl: 'icon-location.svg',
    iconSize: [_iconSize, _iconSize * 1.2],
  })
}

import { Fragment, useEffect, useState } from 'react';
export default function Map({data}) {
  const { location, isp } = useSelector(state => state.coords)
  const [coordinates, setCoordinates] = useState([data.location.lat, data.location.lng])
  useEffect(() => {
    setCoordinates([data.location.lat, data.location.lng])
  }, [data])
  
  const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [lat, lng]);
     return null;
   }

  return (
    <Fragment>
      {coordinates && (    
        <div id="map">
            <MapContainer 
                  center={coordinates} 
                  zoom={12} 
                  scrollWheelZoom={true}
                  style={{height: "100%", width: "100%", zIndex:'0'}}
                  zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                <Marker position={coordinates} icon={getIcon(40)}>
                    <Popup>
                      <div className="ip-tracker__popup-content">
                        <p className="ip-tracker__popup-content--isp">{isp}</p>
                        <p>{`${location.region}, ${location.country}`}</p>
                      </div>
                    </Popup>
                </Marker>
                <ZoomControl position='bottomright' />
                <RecenterAutomatically lat={coordinates[0]} lng={coordinates[1]} />
            </MapContainer>
        </div>
      )}
    </Fragment>
  )
}
