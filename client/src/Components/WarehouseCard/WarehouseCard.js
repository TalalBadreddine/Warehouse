import { BiCctv } from 'react-icons/bi'
import { Carousel } from 'react-bootstrap'
import { useState } from 'react';
import sprinkler from './sprinkler.svg'
import { TbForklift } from 'react-icons/tb'
import { GrUserWorker } from 'react-icons/gr'
import styles from './WarehouseCardCss.module.css'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap';

import ac from './air-conditioner.svg'
import { useNavigate } from 'react-router-dom';
import alternative from './warehouseAlternative.jpeg'

import worker from './worker.svg'

import ui from '../../themes'

const WarehouseCard = (props) => {
    const navigate = useNavigate()


    const navigateToWarehouseDetails = (role, info) => {
        if (role == 'visitor') {
            setShow(true)
        } else if (role == 'customer') {
            navigate('/customer/warehouseDetails', { state: info })
        }
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setColorByStatus = (status) => {

        if(status == 'pending'){
            return 'purple'
        }else if(status == 'accepted'){
            return 'green'
        }else if(status == 'rejected'){
            return 'red'
        }

    }

    const ownerDiv = () => {
        return(
            <div>
                <p style={{color:`${ui.normalText}`}} className='fs-4 d-flex'>Status: <p style={{color: setColorByStatus(props.info.status)}} className="ms-3">{props.info.status == 'accepted' ? 'Listed' : props.info.status }</p> </p> 
            </div>
        )
    }

    return (
        <div>
        <div className={`col-12 col-sm-12 m-2 p-2 d-sm-flex rounded d-block ${styles.cardDiv}`} onClick={() => { navigateToWarehouseDetails(props.role, props.info) }}  >

            <div className='col-sm-4 '>
                <Carousel>
                    {props.info.images.length > 0  ? props.info.images.map((base64,index) => {
                  
                        return(
                            <Carousel.Item>
                                
                        <img
                            key={index}
                            src={base64}
                            alt=""
                            height={'200px'}
                            width={'310px'}
                        />

                    </Carousel.Item>
                        )

                    }) :  <Carousel.Item>
                                
                    <img
                        src={alternative}
                        alt="Warehouse Img"
                        height={'180px'}
                        width={'310px'}
                    />

                </Carousel.Item>
                    
                    }
                </Carousel>
            </div>



            <div className="ms-sm-2 col-sm-8 p-sm-2 p-1 col-12 " >
                <h1 style={{color:`${ui.normalText}`}} className={styles.bigTypo}>{props.info.name}'s warehouse   </h1>
                <h1 className={styles.smallTypo} style={{color:`${ui.normalText}`}}>Address:{props.info.address[0][1]}, {props.info.address[0][0]}</h1>
                <div className=' h-50'>

                {props.info.isSecurityCameras && <BiCctv style={{ color: `${ui.iconsColors}` }} className={` m-2 ${styles.cctvIcon}`} size={27} ></BiCctv>}

                    {props.info.isFireSafe &&<img src={sprinkler} width={'25px'} style={{ color: `${ui.iconsColors}` }} className="m-2"></img>}


                    {props.info.isForklift && <TbForklift style={{ color: `${ui.iconsColors}` }} className="m-2" size={32} ></TbForklift>}


                    {props.info.isWorkers &&  <img src={worker} width={'25px'} style={{ opacity: 1, color: 'white' }} className="m-2 mt-1"></img>}


                    {props.info.isAirConditioning && <img src={ac} width={'27px'} style={{ opacity: 1, color: 'white' }} className="m-2 mt-3"></img>}

                   {props.role == 'owner' ?  ownerDiv() : <p style={{ color:`${ui.normalText}`}}>Price starts from <span style={{filter: props.role == 'visitor' ?  'blur(4px)' : null, color: `${ui.normalText}` }}>${props.info.pricePerDay}</span> with space: <span style={{filter: props.role == 'visitor' ?  'blur(4px)' : null }}>{props.info.space}</span> m<sup>2</sup> </p>}
        
                </div>
          

            </div>
        </div>

        <div>
                        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>You need to Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>Unless you are signed in you will not be able to Check all details</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        navigate('/login')
                    }}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    )
}

export default WarehouseCard