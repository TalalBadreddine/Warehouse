import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from './TileLayer'
import L from 'leaflet'
import {FaWarehouse} from 'react-icons/fa'
import '../../../node_modules/leaflet/dist/leaflet.css'

const MapWithWarehousesOnTheSide = () => {

    const markerIcon = new L.icon({
        iconUrl: require('./warehouse.png'),
        iconSize: [30, 40]
    })
    
    return (
        <div style={{display: 'flex'}}>
        <>
                <MapContainer center={[33.377190, 35.483590]} zoom={13} >
                    <TileLayer
                        url={osm.maptiler.url}
                        attribution={osm.maptiler.attribution}
                    />

                    <Marker position={[33.377190, 35.483590]} icon={markerIcon}>
                        <Popup>
                            <div>
                                <h1>testing the popup</h1>
                            </div>
                        </Popup>
                    </Marker>
                    <Marker position={[33.378190, 35.489590]} icon={markerIcon}>
                        <Popup>
                            <h1>testing Pop up</h1>
                        </Popup>
                    </Marker>
                    <Marker position={[33.387200, 35.480590]} icon={markerIcon}>
                        <Popup>
                            <h1>testing Pop up</h1>
                        </Popup>
                    </Marker>
                </MapContainer>
        </>

        <div style={{margin:'10px'}}>
            <div>
                <h1> I am the first warehouse </h1>
            </div>

            <div>
                <h1> I am the second warehouse </h1>
            </div>

            <div>
                <h1> I am the third warehouse </h1>
            </div>
        </div>

        </div>
    )
}

export default MapWithWarehousesOnTheSide