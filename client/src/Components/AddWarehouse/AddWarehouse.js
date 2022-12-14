import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { AddWarehouseByAdmin } from '../../Services/AddWarehouseByAdmin';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import osm from '../WarehousesMap/TileLayer';
import L, { bind } from 'leaflet'

import { DateRange } from 'react-date-range';
import FileBase64 from 'react-file-base64';

import { BsTrash } from 'react-icons/bs'
import ui from '../../themes'



//TODO: add back button to the page before
function AddWarehouse(props) {

  const [validated, setValidated] = useState(false);
  const [pinLocation, setPinLocation] = useState(null)
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if(warehouse.datesAvailable[0] == null){
      setErrors({...errors, ['date']: 'Select a date where your warehouse is availble for renting'})
      window.scrollTo({top: 10,behavior:'smooth'})
      return
    }

    if(warehouse.images.length < 4 ){
      setErrors({...errors, ['images']: 'You need to add at least 4 images of your warehouse'})
      window.scrollTo({top: 0,behavior:'smooth'})
      return
    }

    if(warehouse.location[0] == null){
      setErrors({...errors, ['map']: 'Select your warehouse location on the map'})
      window.scrollTo({top: 10,behavior:'smooth'})
      return
    }
    
    setValidated(true);
  };
//TODO:validation

//   const navigate = useNavigate();
//   useEffect(() => {
//     axios.get('/warehouseOwner/validateWarehouseOwner').then((res) => {

//     }).catch((error) => {
//       if (error.response.statusText == 'Forbidden') {
//         navigate("/")
//       }
//     });
//   }, [])

  const markerIcon = new L.icon({
     iconUrl: require('../WarehousesMap/warehouse.png'),
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
    isForklift:false,
    images: [],
  });

  const handleAddWarehouseByAdmin = async (e) => {
   e.preventDefault()
    if(validated){
        
    const results=await AddWarehouseByAdmin(warehouse);
       props.addAction(results);
    props.closeAction(); 
}

  }
  

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setErrors({...errors, ['map']: null})
        setWarehouse({ ...warehouse, ['location']: [e.latlng.lat, e.latlng.lng] })
      },
    });
    return false;
  }

  const handleUploadImage = (item) => {
    setErrors({...errors, ['images']:null})
    setWarehouse({ ...warehouse, ['images']: [...warehouse.images, item] })
  }

  const handleDeleteImage = (index) => {
    let images = warehouse.images

    images = images.filter((image, i) => {
      return i != index
    })

    setWarehouse({ ...warehouse, ['images']: [...images] })
  }



  return (
    <Form style={{backgroundColor:`${ui.lightBg}`,color:`${ui.normalText}`}} noValidate validated={validated} onSubmit={handleSubmit}>
      
      <div className='row justify-content-center mt-5'>
        <Card style={{backgroundColor:`${ui.lightBg}`,color:`${ui.normalText}`,width: '65rem',borderColor:`${ui.borders}`}}>

          <Card.Body>
            <FormGroup controlId="validationCustom01">
              <FloatingLabel
                controlId="floatingInput"
                label="Warehouse Name"
                className="mb-3"
              >
                <Form.Control required value={warehouse.name} style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}}
                  onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })} placeholder="Warehouse Name" />
                <Form.Control.Feedback type="invalid">
                  Please choose a Warehouse name.
                </Form.Control.Feedback> </FloatingLabel></FormGroup>
            <FormGroup controlId="validationCustomUsername">
              <FloatingLabel controlId="floatingPassword" label="Space For Warehouse" className="mb-3">
                <Form.Control required value={warehouse.space} style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}}
                  onChange={(e) => setWarehouse({ ...warehouse, space: e.target.value })} placeholder="Space For Warehouse" />
                <Form.Control.Feedback type="invalid">
                  Please choose a Warehouse space.
                </Form.Control.Feedback></FloatingLabel></FormGroup>
            <FormGroup controlId="validationCustom03">
              <FloatingLabel controlId="floatingPassword" label="Warehouse Type" className="mb-3">
                <Form.Select required value={warehouse.type} style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}}
                  onChange={(e) => setWarehouse({ ...warehouse, type: e.target.value })} placeholder="Warehouse Type">

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
                label="Price"
                className="mb-3"
              >

                <Form.Control required value={warehouse.pricePerDay} style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}}
                  onChange={(e) => setWarehouse({ ...warehouse, pricePerDay: e.target.value })} className="mb-3" placeholder="Price" />
                <Form.Control.Feedback type="invalid">
                  Please choose a price.
                </Form.Control.Feedback></FloatingLabel></FormGroup>

            <Accordion className="mb-3" >
              <Accordion.Item style={{backgroundColor:`${ui.lightBg}`}} >
                <Accordion.Header>Choose Availble Dates {errors.date != null && <span className='ms-3 fs-5' style={{color:'red'}}> {errors.date} !</span>}</Accordion.Header>
                <Accordion.Body>
                  <div className='d-flex justify-content-center'>
                  <DateRange
                    date={new Date()}
                    onChange={(item) =>{
                      setSelectedDate(item.selection)
                      setWarehouse({...warehouse, ['availbleDates']:[[item.selection.startDate, item.selection.endDate]]})
                      setErrors({...errors,['date']:null})
                    }
                     }
                    minDate={new Date()}
                    months={2}
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
                <Accordion.Header>Upload images {errors.images != null && <span className='ms-3 fs-5' style={{color:'red'}}> {errors.images} !</span>}</Accordion.Header>
                <Accordion.Body>

                  <div>
                    <div className='col-12 text-center'>
                      <FileBase64
                        multiple={true}
                        onDone={image => handleUploadImage(image[0])} />
                    </div>
                    <div className='mt-5 d-flex'>
                      {warehouse.images && warehouse.images.map((image, index) => {
                        return (
                          <div className='position-relative' key={index}>
                            <img src={image.base64} width='170px' height='100px' className='border ms-3'></img>
                            <p className={`position-absolute `} onClick={() => { handleDeleteImage(index) }} style={{ bottom: 0, right: 3 }}><BsTrash></BsTrash></p>
                          </div>
                        )
                      })}
                    </div>

                  </div>


                </Accordion.Body>
              </Accordion.Item>
            </Accordion>




            <Accordion className="mb-3" style={{borderColor:`${ui.borders}`}} >
              <Accordion.Item style={{backgroundColor:`${ui.lightBg}`,borderColor:`${ui.borders}`}} >
                <Accordion.Header>Choose Your location {errors.map != null && <span className='ms-3 fs-5' style={{color:'red'}}> {errors.map} !</span>}</Accordion.Header>
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
                <Form.Control required value={warehouse.description} style={{backgroundColor:`${ui.searchesInput}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`,height: '100px'}}
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
            <div className='col-12 justify-content-center d-flex'>
                <Button onClick={(e) => {handleAddWarehouseByAdmin(e)}} className='mt-3 te' style={{ backgroundColor: `${ui.Buttons}`}} type="submit" variant="primary">Upload Space</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Form>
  )
}

export default AddWarehouse