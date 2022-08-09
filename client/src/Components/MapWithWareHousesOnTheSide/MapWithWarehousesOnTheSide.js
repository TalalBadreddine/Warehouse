// import { useState, useRef } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
// import osm from './TileLayer'
// import L from 'leaflet'
// import useGeoLocation from "../../hooks/useGeoLocation/useGeoLocation";
// import {Alert, Button} from 'react-bootstrap'
// import '../../../node_modules/leaflet/dist/leaflet.css'

// const MapWithWarehousesOnTheSide = () => {

//     const [center, setCenter] = useState([33.377190, 35.483590])
//     const [mapClick, setMapClick] = useState(null)

//     const markerIcon = new L.icon({
//         iconUrl: require('./warehouse.png'),
//         iconSize: [30, 40]
//     })

//     const location = useGeoLocation()
//     const mapRef = useRef();

//     const showLocation = (x, y) => {
//             mapRef.current.setView([x, y], 17, { 
//                 duration: 1,
//                 animate: true 
//             })
//             // mapRef.current.flyTo([x, y], 16, { animate: true })
//     };

//     const getMyLocation = () => {

//         if(location.loaded && !location.error){
//             mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], 17, { animate: true })
//         }
//     }

//     const MapEvents = () => {
//         useMapEvents({
//           click(e) {
//             setMapClick([e.latlng.lat, e.latlng.lng])
//           },
//         });
//         return false;
//     }
    

//     return (
//         <div style={{display: 'flex'}}>
//         <>
//                 <MapContainer center={center} zoom={15} ref={mapRef} >
//                     <TileLayer
//                         url={osm.maptiler.url}
//                         attribution={osm.maptiler.attribution}
//                     />

//               {location.loaded && !location.error && 
//                 <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={markerIcon}>
//                         <Popup>
//                             <div>
//                                 <h1>Talal's Home</h1>
//                             </div>
//                         </Popup>
//                     </Marker>}

//                     <Marker position={[33.378190, 35.489590]} icon={markerIcon}>
//                         <Popup>
//                             <h1>testing Pop up</h1>
//                         </Popup>
//                     </Marker>
//                     <Marker position={[33.378390, 35.499590]} icon={markerIcon}>
//                         <Popup>
//                             <h1>testing Pop up</h1>
//                         </Popup>
//                     </Marker>
//                     <Marker position={[33.387200, 35.480590]} icon={markerIcon}>
//                         <Popup>
//                             <h1>testing Pop up</h1>
//                         </Popup>
//                     </Marker>
//                     <MapEvents/>
//                 </MapContainer>
//         </>

//         <div style={{margin:'10px'}}>
//         <div onMouseEnter={(e) => {
//                     e.preventDefault()
//                     showLocation(33.378390, 35.499590)
//                 }}>
                    
//                 <h1> I am the first warehouse </h1>
//             </div>

//             <div onMouseEnter={(e) => {
//                     e.preventDefault()
//                     showLocation(33.387200, 35.480590)
//                 }}>

//                 <h1> I am the second warehouse </h1>
//             </div>

//             <div onMouseEnter={(e) => {
//                     e.preventDefault()
//                     showLocation(33.378190, 35.489590)
//                 }}>

//                 <h1> I am the third warehouse </h1>
//             </div>
//         </div>

//         <div>

//             <button onClick={ (e) => {
//                 e.preventDefault()
//                 getMyLocation(location.coordinates.lat, location.coordinates.lng)
//                 }}>Get My Location</button>
//         </div>

//        {mapClick &&
//         <div>
//             <h1>Mouse curser:
//                 x = {mapClick[0]}
//                 y = {mapClick[1]}</h1>
//         </div>}

//         </div>
//     )
// }

// export default MapWithWarehousesOnTheSide