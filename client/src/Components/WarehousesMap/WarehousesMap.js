import { useState, useRef, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import osm from './TileLayer'
import L from 'leaflet'
import useGeoLocation from "../../hooks/useGeoLocation/useGeoLocation";
import '../../../node_modules/leaflet/dist/leaflet.css'

const WarehousesMap = (props) => {
    const [warehousesInfo, setWarehousesInfo] = useState(null)
    const [center, setCenter] = useState([33.377190, 35.483590])
    const [goToMap, setGoToMap] = useState(null)
    const [clickLocation, setClickLocation] = useState(null)
    const [showPinLocation, setShowPinLocation] = useState(false)

    useEffect(() => {
        setWarehousesInfo(props.warehousesInfo)
        setGoToMap(props.flyToMap)
    
    }, [])

    const markerIcon = new L.icon({
        iconUrl: require('./warehouse.png'),
        iconSize: [30, 40]
    })

    const pinOnMap = new L.icon({
        iconUrl: require('./pinLocation.gif'),
        iconSize: [30,40]
    })

    const pinMyLocation = new L.icon({
        iconUrl: require('./pinMyLocation.png'),
        iconSize: [40,30]
    })

    const location = useGeoLocation()
    const mapRef = useRef();

    useEffect(() => {
        props.setMylocation && props.setMylocation(location)
    }, [location])

    const showLocation = (x, y) => {
        // mapRef.current.setView([x, y], 16, {
        //     duration: 2,
        //     animate: true
        // })
        mapRef.current.flyTo([x, y], 16, {
            duration: 3,
            animate: true
        })
    };
    props.flyToMap && showLocation(parseFloat(props.flyToMap[0]), parseFloat(props.flyToMap[1]))
    props.getMyLocation && getMyLocation()
    const getMyLocation = () => {

        if (location.loaded && !location.error) {
            mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], 17, { animate: true })
        }
    }

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                if(props && props.canPin){
                    setClickLocation([e.latlng.lat, e.latlng.lng])
                    props.setPinLocation([e.latlng.lat, e.latlng.lng])
                }

            },
        });
        return false;
    }


    return (
        <div style={{ display: 'flex' }}>
            <>
                <MapContainer center={center} zoom={15} ref={mapRef} >
                    <TileLayer
                        url={osm.maptiler.url}
                        attribution={osm.maptiler.attribution}
                    />

                    {location.loaded && !location.error &&
                        <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={pinMyLocation}>
                            <Popup>
                                <div>
                                    <h1>My Location</h1>
                                </div>
                            </Popup>
                        </Marker>}

                    {props.info && props.info.map((warehouse) => {
                        return (
                            <Marker position={[parseFloat(warehouse.location[0]), parseFloat(warehouse.location[1])]} icon={markerIcon}>
                                <Popup>
                                    <div>

                                        <h3 className="fs-4">{warehouse.name}</h3>
                                        <p><span style={{ fontWeight: 'bold' }} >Details:</span> {warehouse.description}</p>
                                    </div>

                                </Popup>
                            </Marker>
                        )
                    })}

                    {props.canPin && clickLocation != null && clickLocation != undefined && 
                        <Marker position={[parseFloat(clickLocation[0]), parseFloat(clickLocation[1])]} icon={pinOnMap}>
                            <Popup>
                                <h3 className="fs-4">PingLocation</h3>  
                            </Popup>
                        </Marker>}
                    <MapEvents />
                </MapContainer>
            </>



            {/* <div onMouseEnter={(e) => {
                    e.preventDefault()
                    showLocation(33.378190, 35.489590)
                }}>

                    <h1> I am the third warehouse </h1>
                </div> */}


            {/* <button onClick={(e) => {
                    e.preventDefault()
                    getMyLocation(location.coordinates.lat, location.coordinates.lng)
                }}>Get My Location</button> */}


        </div>
    )
}

export default WarehousesMap