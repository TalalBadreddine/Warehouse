import { MapContainer, TileLayer } from "react-leaflet";
import osm from './TileLayer'
import '../../../node_modules/leaflet/dist/leaflet.css'

const MapWithWarehousesOnTheSide = () => {
    return (
        <>
                <MapContainer center={[33.377190, 35.483590]} zoom={13} >
                    <TileLayer
                        url={osm.maptiler.url}
                        attribution={osm.maptiler.attribution}
                    />
                </MapContainer>
        </>
    )
}

export default MapWithWarehousesOnTheSide