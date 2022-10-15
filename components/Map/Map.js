import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'

import { Fragment, useEffect, useState } from 'react';
export default function Map({data}) {
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
                scrollWheelZoom={false}
                style={{height: "100%", width: "100%",zIndex:'1'}}
              >
                  <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                <Marker position={coordinates}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <RecenterAutomatically lat={coordinates[0]} lng={coordinates[1]} />
            </MapContainer>
        </div>
      )}
    </Fragment>
  )
}
