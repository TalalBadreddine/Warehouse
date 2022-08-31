import { useEffect, useRef, useState } from 'react';
import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import Accordion from 'react-bootstrap/Accordion';
import ui from '../../../themes'
import axios from 'axios';
import CustomChart from '../../../Components/CustomChart/CustomChart';
import styles from './OwnerProfileCss.module.css'
import { Skeleton } from '@mui/material';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';




function OwnerProfile() {

    const [warehousesData, setWarehousesData] = useState(null)
    const [personalInfo, setPersonalInfo] = useState(null)
    const [currentRequest, setCurrentRequest] = useState(null)
    const [newImage, setNewImage] = useState(null)
    const uploadImageRef = useRef()

    const [selectedSection, setSelectedSection] = useState('default')

    const [sideDivs, setSideDivs] = useState({
        upperDiv: null,
        lowerDiv: null,
    })

    useEffect(() => {

        axios.get(('/warehouseOwner/getMyInfo')).then((results) => {
            let data = results.data
            console.log(data)
            setWarehousesData(data.warhousesData)
            setPersonalInfo(data.myInfo)
        })

    }, []);

    useEffect(() => {
     
        const getDefault = async  () => {
            await getGraphs().then((data) => {
                setSideDivs({ ...sideDivs, ['upperDiv']: getPersonalData(), ['lowerDiv']: data })
    
            })
        }

        getDefault()



    }, [warehousesData])


    const getPersonalData = () => {
        return (
            <MDBCard className="mb-4" style={{ backgroundColor: `${ui.darkBg}` }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{personalInfo.userName}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{personalInfo.email}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{personalInfo.phoneNumber}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Owner Since</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{new Date(personalInfo.registrationDate).toISOString().slice(0, 10)}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        )
    }

    const getCalander = (request) => {
        console.log(request)
        return(

        <div >
                <MDBRow>
                    <MDBCol md="12" >
                    <MDBCard style={{ backgroundColor: `${ui.darkBg}`, color:`${ui.normalText}` }} className="mb-4 pt-4 px-4 mb-md-0 pb-5">
                    <FullCalendar
           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
           height={'550px'}
           headerToolbar={{
             left: 'prev,next today',
             center: 'title',
             right: 'dayGridMonth,timeGridWeek,timeGridDay'
           }}
            initialDate={`${request.startRentDate}`}
            events={[
                { title: 'Rented', start: `${request.startRentDate}`, end: `${request.endRentDate}`, allDay:'true',color:`${ui.borders}` },
              ]}
        />
                                </MDBCard>

                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

    const getRequestData = async (request) => {
        let userInfo = []
        await axios.post('/warehouseOwner/getUser',{
            userEmail: request.userEmail
        }).then((results) => {

            userInfo = results.data
        })
        console.log(userInfo)


            return(
                <MDBCard className="mb-4" style={{ backgroundColor: `${ui.darkBg}` }}>
                <MDBCardBody>
                <MDBRow>

                    <div className='col-6 d-flex'>
                        <img src={`${userInfo.image}`} alt={'img'} width='140px' height='140px' style={{borderRadius:'100%'}} className={styles.profileImg}></img>
                        <h1 className='ms-2 m-auto' style={{color:`${ui.normalText}`}}>{userInfo.userName}</h1>
                    </div>
                </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{request.userEmail}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Status</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: userInfo.isActive ? 'Green' : 'Red' }}>{userInfo.isActive ? 'Active' : 'Deactive'}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>User Since</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{new Date(userInfo.registrationDate).toISOString().slice(0, 10)}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>Stripe Account</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText style={{ color: `${ui.normalText}` }}>{userInfo.stripeAccountId}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                </MDBCardBody>
            </MDBCard>
    
            )

    }

    const getGraphs = async () => {
        if (warehousesData == undefined) {
            return (
                <div>

                </div>
            )
        }

        let profitArr = []
        let warehousesArr = []

        let requestsCount = []

        warehousesData.map((info) => {
            let profit = 0
            let count = 0

            info.requests.map((request) => {
                count += 1
                if (request.status == 'accepted') {
                    profit += request.price
                }
            })

            profitArr.push(profit)
            warehousesArr.push(info.warehouse[0].name)
            requestsCount.push(count)
        })

        return (
            <div>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard style={{ backgroundColor: `${ui.darkBg}` }} className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <CustomChart graphType={'doughnut'} graphTitle="" idHelper={`test`} graphData={profitArr} graphLabels={warehousesArr} ></CustomChart>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol md="6">
                        <MDBCard style={{ backgroundColor: `${ui.darkBg}` }} className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <CustomChart graphType={'bar'} graphTitle="" idHelper={`test2`} graphData={profitArr} graphLabels={warehousesArr} ></CustomChart>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

    if(personalInfo == null ){
        return(
            <div className='col-8 m-auto'>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            </div>
        )
    }
    

    const handleEditImageBtnClick = () => {
        uploadImageRef.current.click()

    }

    const handleOnAddingImg = async () =>{
        let base64 = await toBase64(uploadImageRef.current.files[0])
        setPersonalInfo({...personalInfo, ['image']: base64})

        axios.post('/warehouseOwner/updateImg', {
            image: base64
        }).then((results) => {
            console.log(results.data)
        })
    }

    return (
        <>
            <section>
                <MDBContainer className="py-5" >
                    <div className='d-none'>
                        <input type="file" ref={uploadImageRef} onChange={()=>(handleOnAddingImg())} />
                    </div>
                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4" style={{ backgroundColor: `${ui.darkBg}` }} >
                                <MDBCardBody className="text-center">
                                    <div style={{position:'relative'}} className={styles.profileImg}>
                                    <MDBCardImage
                                        src={`${personalInfo.image}`}
                                        alt="avatar"
                                        className={styles.profileImg}
                                        style={{ width: '150px', height:'150px', borderRadius:'100%', position:'relative' }}
                                        fluid />
                                        <Button onClick={() => {handleEditImageBtnClick()}} className={styles.editImgBtn} style={{position:'absolute', top:'50%', right: '44%', border:'1px soli white', color:`${ui.Buttons}`, backgroundColor:'transparent'}}>Edit</Button>
                                        </div>
                                    <p className="mb-1" style={{ color: `${ui.normalText}` }}>Phone Number: {personalInfo.phoneNumber}</p>
                                    <p className="mb-4" style={{ color: `${ui.normalText}` }}>Stripe Account: {personalInfo.stripeAccountId}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                    </div>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0 mt-5" style={{ backgroundColor: `${ui.darkBg}` }} >
                                <MDBCardBody className="p-0" >
                                    <MDBListGroup flush className="rounded-3" >
                                        <div style={{ height: '500px', overflowY: 'scroll' }}>
                                        <Accordion className="mb-3" >
                                            {warehousesData && warehousesData.map((info) => {
                                                let currentWarehouse = info.warehouse[0]
                                                return (
                                                    
                                                        <Accordion.Item style={{ backgroundColor: `${ui.lightBg}` }} >
                                                            <Accordion.Header>
                                                                <div className='d-flex'>
                                                                <img src={currentWarehouse.images[0]} width={'60px'} height={'60px'} alt='warehouseImg'></img>
                                                                <p className='fs-4 ms-3 text-center'>{currentWarehouse.name}</p>
                                                                </div>
                                                             
                                                                </Accordion.Header>
                                                            <Accordion.Body>
                                                                {info.requests && info.requests.map((request) => {
                                                                    return(
                                                                    <div className={styles.tableRow} style={{borderRadius:'10px'}} onClick={ async () => {
                                                                        let newUpper = []

                                                                        await getRequestData(request).then((results) => {
                                                                            newUpper = results
                                                                        })

                                                                        setSideDivs({...sideDivs, ['lowerDiv']: getCalander(request), ['upperDiv']: newUpper})
                                                                        }}>
                                                                        <div className='d-flex justify-content-center' style={{color:`${ui.normalText}`}}> 
                                                                        <p style={{color:'white'}}>{request.userEmail}</p>
                                                                        <p className='ms-4'>From:</p>
                                                                        <p> {new Date(request.startRentDate).toISOString().slice(0, 10)}</p>
                                                                        <p className='ms-4'>To:</p>
                                                                        <p>{new Date(request.endRentDate).toISOString().slice(0, 10)}</p>
                                                                        </div>
   
                                                                        <div>
                                                                        <hr></hr>
                                                                        </div>
                                                                    </div>)
                                                                }) }
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                  
                                                )
                                            })}
                                            </Accordion>
                                        </div>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="8">

                            {sideDivs.upperDiv && sideDivs.upperDiv}

                            {sideDivs.lowerDiv && sideDivs.lowerDiv}



                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default OwnerProfile