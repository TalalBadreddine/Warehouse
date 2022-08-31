import { useEffect, useRef, useState } from "react";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { Button } from "react-bootstrap";
import styles from "./EditProfileCss.module.css";
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
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import ui from "../../../themes";
import { getCurrentUser } from "../../../Services/getCurrentUser";
import { getUserWarehouseRequests } from "../../../Services/getUserWarehouseRequests";
import FileBase64 from "react-file-base64";

function EditProfile() {
  const [newImage, setNewImage] = useState(null);
  const uploadImageRef = useRef();

  const [selectedSection, setSelectedSection] = useState("default");

  const [personalInfo, setPersonalInfo] = useState(null);
  const [userProfile, setUserProfile] = useState({
    images: [],
  });
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((result) => {
        console.log(result.data);
        setPersonalInfo(result.data);
        setCurrUser(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [userReq, setUserReq] = useState(null);

  useEffect(() => {
    if (!currUser) return;

    getUserWarehouseRequests(currUser.email)
      .then((result) => {
        console.log(result.data);
        setUserReq(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  if (!currUser) {
    return (
      <div>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      </div>
    );
  }

  const handleEditImageBtnClick = () => {
    uploadImageRef.current.click();
  };

  const handleOnAddingImg = async () => {
    let base64 = await toBase64(uploadImageRef.current.files[0]);
    setPersonalInfo({ ...personalInfo, ["image"]: base64 });

    axios
      .post("/user/updateImg", {
        image: base64,
      })
      .then((results) => {
        console.log(results.data);
      });
  };
  return (
    <>
      <section>
        <MDBContainer className="py-5">
          <div className="d-none">
            <input
              type="file"
              ref={uploadImageRef}
              onChange={() => handleOnAddingImg()}
            />
          </div>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard
                className="mb-4 "
                style={{ backgroundColor: `${ui.darkBg}`, height: "92%" }}
              >
                <MDBCardBody className="text-center">
                  <div
                    style={{ position: "relative" }}
                    className={styles.profileImg}
                  >
                    <MDBCardImage
                      src={`${personalInfo.image}`}
                      alt="avatar"
                      className={styles.profileImg}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "100%",
                        position: "relative",
                        marginTop: "20px",
                      }}
                      fluid
                    />
                    <Button
                      onClick={() => {
                        handleEditImageBtnClick();
                      }}
                      className={styles.editImgBtn}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "44%",
                        border: "1px solid white",
                        color: `${ui.normalText}`,
                        backgroundColor: `${ui.backgroundColor}`,
                      }}
                    >
                      Edit
                    </Button>
                  </div>

                  <p
                    className="mb-4 mt-3"
                    style={{ color: `${ui.normalText}` }}
                  >
                    Full Name: {personalInfo.userName}
                  </p>
                  <div className="d-flex justify-content-center mb-2"></div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard
                className="mb-4"
                style={{ backgroundColor: `${ui.darkBg}` }}
              >
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        Full Name
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText
                        contentEditable="true"
                        style={{ color: `${ui.normalText}` }}
                      >
                        {currUser.userName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        Email
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        {currUser.userName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        Registration Date
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        {new Date(currUser.registrationDate)
                          .toISOString()
                          .slice(0, 10)}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        Status
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText
                        style={{
                          fontWeight: "bold",
                          color: currUser.isActive ? "#90EE90" : "red",
                        }}
                      >
                        {currUser.isActive ? "Active" : "Deactive"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        Stripe Account Id
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText style={{ color: `${ui.normalText}` }}>
                        {currUser.stripeAccountId}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              </MDBCol>
</MDBRow>
              <MDBRow>
                <MDBCol style={{ width: "100%" }}>
                  <table
                    style={{ borderColor:`${ui.backgroundColor}`, backgroundColor: `${ui.darkBg}` }}
                    className="table  table-bordered mt-3"
                  >
                    <thead style={{ color: "white" }}>
                      <tr>
                        <th scope="col">Warehouse Owner Email</th>
                        <th scope="col">Warehouse Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Start Rent Date</th>
                        <th scope="col">End Rent Date</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "white" }}>
                      {userReq &&
                        userReq.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user.warehouseOwnerEmail}</td>
                              <td>{user.warehouseName}</td>
                              <td>{user.status}</td>
                              <td>
                                {new Date(user.startRentDate)
                                  .toISOString()
                                  .slice(0, 10)}
                              </td>
                              <td>
                                {new Date(user.endRentDate)
                                  .toISOString()
                                  .slice(0, 10)}
                              </td>
                              <td>{user.price}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </MDBCol>
              
           
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default EditProfile;
