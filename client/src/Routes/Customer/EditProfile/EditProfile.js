import {useEffect,useState} from 'react';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { BsTrash } from 'react-icons/bs'
import {Skeleton} from '@mui/material'
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
  import ui from '../../../themes'
  import {getCurrentUser} from '../../../Services/getCurrentUser';
  import { getUserWarehouseRequests } from '../../../Services/getUserWarehouseRequests';
  import FileBase64 from 'react-file-base64';

function EditProfile() {
const [userProfile,setUserProfile]=useState({
images:[]
});
const [currUser,setCurrUser]=useState(null);

  useEffect(()=>{

    getCurrentUser().then(result => {
      
   console.log(result.data)
 setCurrUser(result.data)

}).catch((err) => {
  console.log(err.message);
})
},[]);
const [userReq,setUserReq]=useState(null);

useEffect(()=>{
    if(!currUser)return
    getUserWarehouseRequests(currUser.user.email).then(result => {
      
   console.log(result.data)
 setUserReq(result.data)

}).catch((err) => {
  console.log(err.message);
})
},[]);

 if(!currUser){
  return(
    <div>
      <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
    </div>
  )
 }
 const handleUploadImage = (item) => {

  let images = []
  for (let i = 0; i < item.length; i++) {
    images.push(item[i].base64)
  }
  // setErrors({ ...errors, ['images']: null })
  setUserProfile({ ...userProfile, ['images']: [...userProfile.images, ...images] })
}
  return (
    <>
    <section>
      <MDBContainer className="py-5" >
       

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4"style={{backgroundColor: `${ui.darkBg}`}} >
              <MDBCardBody className="text-center">
                
              
              
                <span style={{color:`${ui.normalText}`}}> Upload images </span>
               
<div display="flex" alignItems="center"justifyContent="center">
         
                  
                  <div className='col-12'>
                      {userProfile.images && userProfile.images.map((image, index) => {
                        return (
                          <div className='m-auto col-3' style={{   width: '50%' }} key={index}>
                            <img style={{borderRadius:'50%'}} src={image} width='150px' height='150px' className='border ms-3'></img>
                           
                          </div>
                        )
                      })}
                    </div></div>
<br></br><br></br>
                  <div>
                    <div className=' col-12 text-center'>
                      <FileBase64
                        multiple={true}
                        onDone={image => handleUploadImage(image)} />
                    </div>
                    

                  </div>


                
           
                
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4" style={{backgroundColor: `${ui.darkBg}`}}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color: `${ui.normalText}`}}>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText contentEditable="true" style={{color: `${ui.normalText}`}}>{currUser.user.userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color: `${ui.normalText}`}}>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{color: `${ui.normalText}`}}>{currUser.user.userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color: `${ui.normalText}`}}>Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{color: `${ui.normalText}`}}>{currUser.role}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText style={{color: `${ui.normalText}`}}>Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText style={{fontWeight:'bold',color:currUser.user.isActive ? '#90EE90':'red'}} >{currUser.user.isActive ? 'Active' : 'Deactive'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                  <MDBCardText style={{color: `${ui.normalText}`}}>Stripe Account Id</MDBCardText>
                  
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBCardText style={{color: `${ui.normalText}`}}>{currUser.user.stripeAccountId}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
              /* <div className="container">
        <table style={{backgroundColor: `${ui.darkBg}`}} className="table table-hover table-bordered mt-3">
          <thead style={{color:'white'}}>
            <tr>
              <th scope="col">Warehouse Owner Email</th>
              <th scope="col">Warehouse Name</th>
              <th scope="col">Status</th>
              <th scope="col">Start Rent Date</th>
              <th scope="col">End Rent Date</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody style={{color:'white'}} >
            {userReq && userReq.map((user,index) => {
              return(
              <tr key={index}>
               
                <td>{user.warehouseOwnerEmail}</td>
                <td>{user.warehouseName}</td>
                <td>{user.status}</td>
                <td>{user.startRentDate}</td>
                <td>{user.endRentDate}</td>
                <td>{user.price}</td>
   
              </tr>
           ) })}

           
          </tbody>
        </table>
      </div> */
                
                         </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  )
}
 
export default EditProfile