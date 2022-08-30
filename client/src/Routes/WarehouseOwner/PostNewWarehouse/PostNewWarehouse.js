import React, { useLayoutEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { addWarehouse } from '../../../Services/AddNewWarehouse';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import SuccessCheckMark from '../../../Components/SuccessCheckMark/SuccessCheckMark'

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import osm from '../../../Components/WarehousesMap/TileLayer'
import L, { bind } from 'leaflet'

import { DateRange } from 'react-date-range';
import FileBase64 from 'react-file-base64';

import { BsTrash } from 'react-icons/bs'
import styles from './PostNewWarehouseCss.module.css'

import ui from '../../../themes'


//TODO: add back button to the page before
function PostNewWarehouse() {

  const [validated, setValidated] = useState(false);
  const [pinLocation, setPinLocation] = useState(null)
  const [isSuccessMarkHidden, setIsSuccessMarkHidden] = useState(true)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({

    map: null,

    date: null,

    images: null
  })

  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
    key: 'selection'
  })

  const [windowWidth, setwindowWidth] = useState(window.innerWidth)


  const useWindowSize = () => {

      useLayoutEffect(() => {
          const updateSize = () => {
              setwindowWidth(window.innerWidth)
              console.log(windowWidth)
          };
          window.addEventListener("resize", updateSize)

      }, [])

  }

  useWindowSize()

  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/warehouseOwner/validateWarehouseOwner').then((res) => {
      if (res.data == 'forbidden') { navigate('/') }
    }).catch((error) => {
      if (error.response.statusText == 'Forbidden') {
        navigate("/")
      }
    });
  }, [])

  const markerIcon = new L.icon({
    iconUrl: require('../../../Components/WarehousesMap/warehouse.png'),
    iconSize: [30, 40]
  })

  const [warehouse, setWarehouse] = useState({
    name: "",
    space: "",
    location: [null, null],
    datesAvailable: [null],
    type: "",
    pricePerDay: null,
    description: "",
    isFireSafe: false,
    isSecurityCameras: false,
    isAirConditioning: false,
    isWorkers: false,
    isForklift: false,
    images: [],
  });

  useEffect(() => {

    setError(null)
  },[warehouse])


  const handleAddWarehouse = async (e) => {
    e.preventDefault()
    setIsSuccessMarkHidden(false)

    if (warehouse.name == null || warehouse.name == '') {
      setError("Warehouse name can't be empty ")
      return false
    }

    if (warehouse.space == null || warehouse.space == '') {
      setError('Provide the space of your warehouse')
      return false
    }

    if (warehouse.pricePerDay <= 0 || warehouse.pricePerDay == null || warehouse.pricePerDay == '') {
      setError('Provide the price per day of your warehouse')
      return false
    }

    if (warehouse.description == '' || warehouse.description == null) {
      setError('Provide a description for your warehouse')
      return false
    }

    if (warehouse.datesAvailable[0] == null) {
      setError( 'Select a date where your warehouse is availble for renting' )
      return false
    }

    if (warehouse.images.length < 4) {
      setError( 'You need to add at least 4 images of your warehouse' )
      return false
    }

    if (warehouse.location[0] == null) {
      setError('Select your warehouse location on the map')
      return false
    }

    await addWarehouse(warehouse)

    setIsSuccessMarkHidden(false)

    window.scrollTo({ top: 10, behavior: 'smooth' })
    setTimeout(() => { navigate('/owner/') }, 4000)

    await axios.post('/userActivity', {
      action: `listed a new warehouse for renting, the warehouse name: ${warehouse.name}, with a space of ${warehouse.space} meters squared`,
      role: 'warehouseOwner'
    }).then((results) => {
    })

  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setErrors({ ...errors, ['map']: null })
        setWarehouse({ ...warehouse, ['location']: [e.latlng.lat, e.latlng.lng] })
      },
    });
    return false;
  }

  const handleUploadImage = (item) => {
    let images = []
    for (let i = 0; i < item.length; i++) {
      images.push(item[i].base64)
    }
    setErrors({ ...errors, ['images']: null })
    setWarehouse({ ...warehouse, ['images']: [...warehouse.images, ...images] })
  }

  const handleDeleteImage = (index) => {
    let images = warehouse.images

    images = images.filter((image, i) => {
      return i != index
    })

    setWarehouse({ ...warehouse, ['images']: [...images] })
  }


  return (
    <Form >
      <div className='row justify-content-center mt-5'>
        <h1 style={{ color: `${ui.bigTitle}` }} className='text-center '>Post Your Space</h1>
      </div>
      <div className='row justify-content-center mt-5'>
        <Card style={{ width: '65rem' , backgroundColor: `${ui.darkBg}` , borderColor: `${ui.borders}`  }}>

          <Card.Body>
            <FormGroup controlId="validationCustom01">
              <FloatingLabel
                controlId="floatingInput"
                label="Warehouse Name"
                className="mb-3"
                style={{color:`${ui.normalText}`}}
              >
                <Form.Control style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}} required value={warehouse.name}
                  onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })} placeholder="Warehouse Name" />
                <Form.Control.Feedback type="invalid">
                  Please choose a Warehouse name.
                </Form.Control.Feedback> </FloatingLabel></FormGroup>

            <FormGroup controlId="validationCustomUsername">
              <FloatingLabel controlId="floatingPassword" label="Space For Warehouse (㎡)" className="mb-3">
                <Form.Control style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}} required value={warehouse.space}
                  onChange={(e) => setWarehouse({ ...warehouse, space: e.target.value })} placeholder="Space For Warehouse" />
                <Form.Control.Feedback type="invalid">
                  Please choose a Warehouse space.
                </Form.Control.Feedback></FloatingLabel></FormGroup>

            <FormGroup controlId="validationCustom03">
              <FloatingLabel controlId="floatingPassword" label="Warehouse Type" className="mb-3">
                <Form.Select style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}} required value={warehouse.type}
                  onChange={(e) => setWarehouse({ ...warehouse, ['type']: e.target.value })} placeholder="Warehouse Type">

                  <option value="Public Warehouse">Public Warehouse</option>
                  <option value="Private Warehouse">Private Warehouse</option>
                  <option value="Smart Warehouse">Smart Warehouse</option>
                  <option value="Cooperative Warehouse">Cooperative Warehouse</option>
                  <option value="Consolidated Warehouse">Consolidated Warehouse</option>
                  <option value="Bonded Warehouse">Bonded Warehouse</option>
                  <option value="Government Warehouse">Government Warehouse</option>
                  <option value="Cold Storage Warehouse">Cold Storage Warehouse</option>
                  <option value="On-Demand Warehouse">On-Demand Warehouse</option>
                  <option value="Distribution Centers">Distribution Centers</option>
                </Form.Select>
              </FloatingLabel></FormGroup>
              
            <FormGroup controlId="validationCustom04">
              <FloatingLabel
                controlId="floatingInput"
                label="Price (USD)"
                className="mb-3"
              >

                <Form.Control style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}} required value={warehouse.pricePerDay}
                  onChange={(e) => setWarehouse({ ...warehouse, pricePerDay: e.target.value })} className="mb-3" placeholder="Price" />
                <Form.Control.Feedback type="invalid">
                  Please choose a price.
                </Form.Control.Feedback></FloatingLabel></FormGroup>

            <Accordion className="mb-3" >
              <Accordion.Item style={{backgroundColor:`${ui.lightBg}`}} >
                <Accordion.Header > <span style={{color:`${ui.normalText}`}}>Choose Availble Dates </span>{errors.date != null && <span className='ms-3 fs-5' style={{color:'red'}}> {errors.date} !</span>}</Accordion.Header>
                <Accordion.Body>
                  <div className='d-flex justify-content-center'>
                    <DateRange
                      date={new Date()}
                      onChange={(item) => {
                        setSelectedDate(item.selection)
                        console.log(item.selection)
                        setWarehouse({ ...warehouse, ['datesAvailable']: [[item.selection.startDate, item.selection.endDate]] })
                        setErrors({ ...errors, ['date']: null })
                      }
                      }
                      minDate={new Date()}
                      months={windowWidth > 710 ? 2 : 1}
                      ranges={[selectedDate]}
                      direction="horizontal"
                    >

                    </DateRange>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>


            <Accordion className="mb-3" >
              <Accordion.Item style={{backgroundColor:`${ui.lightBg}`}} >
                <Accordion.Header><span style={{color:`${ui.normalText}`}}> Upload images </span>{errors.images != null && <span className='ms-3 fs-5' style={{color:'red'}}> {errors.images} !</span>}</Accordion.Header>
                <Accordion.Body>

                  <div>
                    <div className='col-12 text-center'>
                      <FileBase64
                        multiple={true}
                        onDone={image => handleUploadImage(image)} />
                    </div>
                    <div className='mt-5 d-flex flex-wrap col-12'>
                      {warehouse.images && warehouse.images.map((image, index) => {
                        return (
                          <div className='position-relative ms-2' style={{ width: '22%' }} key={index}>
                            <img src={image} width='100%' height='100px' className='border ms-3'></img>
                            <p className={`position-absolute ${styles.trashIcon} `} onClick={() => { handleDeleteImage(index) }} style={{ bottom: 0, right: 3 }}><BsTrash></BsTrash></p>
                          </div>
                        )
                      })}
                    </div>

                  </div>


                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {!isSuccessMarkHidden && <SuccessCheckMark></SuccessCheckMark>}



            <Accordion className="mb-3" >
              <Accordion.Item style={{backgroundColor:`${ui.lightBg}`}}>
                <Accordion.Header> <span style={{color:`${ui.normalText}`}}>Choose Your location</span>  {errors.map != null && <span className='ms-3 fs-5' style={{color:'red'}}> {errors.map} !</span>}</Accordion.Header>
                <Accordion.Body>

                  <MapContainer center={[0, 0]} zoom={3} >
                    <TileLayer
                      url={osm.maptiler.url}
                      attribution={osm.maptiler.attribution}
                    />

                    {warehouse.location[0] &&
                      <Marker position={[warehouse.location[0], warehouse.location[1]]} icon={markerIcon}>
                        <Popup>
                          <div>
                            <h3>my warehouse</h3>
                          </div>
                        </Popup>
                      </Marker>}

                    <MapEvents />
                  </MapContainer>



                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <FormGroup controlId="validationCustom05">
              <FloatingLabel className="mb-3" controlId="floatingPassword" label="Description">
                <Form.Control style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}` , height: '100px'}} required value={warehouse.description}
                  onChange={(e) => setWarehouse({ ...warehouse, description: e.target.value })} className="mb-3" placeholder="Description" />
                <Form.Control.Feedback type="invalid">
                  Please write a description
                </Form.Control.Feedback> </FloatingLabel></FormGroup>
            <Form>
              <Form.Check
                value={warehouse.isFireSafe}
                onChange={(e) => setWarehouse({ ...warehouse, isFireSafe: e.target.checked })}
                type="checkbox"
                id="custom-switch"
                label="Fire Safety"
                style={{color:`${ui.normalText}`}}
              />
              <Form.Check
                value={warehouse.isSecurityCameras}
                onChange={(e) => setWarehouse({ ...warehouse, isSecurityCameras: e.target.checked })}
                type="checkbox"
                id="custom-switch"
                label="Security Cameras"
              />

              <Form.Check
                value={warehouse.isAirConditioning}
                onChange={(e) => setWarehouse({ ...warehouse, isAirConditioning: e.target.checked })}
                type="checkbox"
                id="custom-switch"
                label="Air Conditioning"
              />
              <Form.Check
                value={warehouse.isWorkers}
                onChange={(e) => setWarehouse({ ...warehouse, isWorkers: e.target.checked })}
                type="checkbox"
                id="custom-switch"
                label="Workers"
              /></Form>

            <Form.Check
              value={warehouse.isForklift}
              onChange={(e) => setWarehouse({ ...warehouse, isForklift: e.target.checked })}
              type="checkbox"
              id="custom-switch"
              label="Forklift"
              ></Form.Check>
              {error && <div className='mt-3' style={{color: 'red'}}>
                <p>{error}</p>
              </div>}
            <div className='col-12 justify-content-center d-flex'>
                <Button onClick={(e) => {handleAddWarehouse(e)}} className='mt-3 te' style={{backgroundColor:`${ui.Buttons}`}} type="submit" variant="primary">Upload Space</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Form>

  )
}

export default PostNewWarehouse