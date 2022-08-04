import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

const AboutUs = () => {
    return (
        <Container>
            {/* <Navbar/> */}
            <MDBRow>  <br></br> <br></br>  </MDBRow>
            <MDBRow>

                <MDBCol md='6' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' >
                        <Card.Body>
                            <Card.Title className="fst-italic" ><h1 >OUR MISSION</h1></Card.Title>

                            <Card.Text className="fs-5 lh-lg fw-light">
                                Our goal is to provide you with custom-made warehouses. That is why we are constantly striving to expand and improve. We want you to be able to choose a warehouse where it is most effective for you, so we can provide you with warehouses across Lebanon. Just choose.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>

                <MDBCol md='6'><img src='https://inviarobotics.com/wp-content/uploads/2020/03/warehouses_part_III.jpg'
                    className='img-fluid shadow-10-strong rounded'
                    alt='' style={{ boxShadow: '8px 8px 9px black' }} />
                </MDBCol>
            </MDBRow>
            <MDBRow>  <br></br> <br></br>  </MDBRow>
            <MDBRow>
                <MDBCol md='6'>
                    <img src='https://media.istockphoto.com/photos/warehouse-or-storage-and-shelves-with-cardboard-boxes-industrial-picture-id1126931828?k=20&m=1126931828&s=612x612&w=0&h=YqFMw1SBimeWZWk2b_9Fpmb3mQRC2G2hpJ8fenWKXeo='
                        className='img-fluid shadow-10-strong rounded'
                        alt='' style={{ boxShadow: '8px 8px 9px black' }} />
                </MDBCol>

                <MDBCol md='6' xs='10'>
                    <Card border="light" >
                        <Card.Body>
                            <Card.Title className="fst-italic"><h1>WAREHOUSE SPACE</h1></Card.Title>

                            <Card.Text className="fs-5 lh-lg fw-light">
                                Warehouse space across Lebanon and with a professional approach - that's WAREHOUSE FOR RENT. We have been focusing on the sale and rental of large-scale commercial space for more than 20 years. We know how this area works and how it evolves, so we will be happy to help you get your business one more step forward.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBRow>  <br></br> <br></br>  </MDBRow>
            </MDBRow>

            <MDBRow>


                <MDBCol md='6' xs='10'>
                    <Card border="light" >
                        <Card.Body>
                            <Card.Title className="fst-italic"><h1>PRODUCTION SPACES</h1></Card.Title>

                            <Card.Text className="fs-5 lh-lg fw-light">
                                Does your business want to expand into other parts of Lebanon? We will advise you on which location will be strategic for your business and how to find manufacturing facilities in the right places. We are in contact with landlords and interested people every day, so we know the needs of our clients and we know how to satisfy them.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBCol md='6'>
                    <img src='https://www.expo21xx.com/news/wp-content/uploads/TAWI-Mobile-Order-Picker.png'
                        className='img-fluid shadow-10-strong rounded'
                        alt='' style={{ boxShadow: '8px 8px 9px black' }} />
                </MDBCol>
                <MDBRow>  <br></br> <br></br>  </MDBRow>
            </MDBRow>

            <MDBRow>  <br></br> <br></br>  </MDBRow>
            <MDBRow>  <hr></hr>  </MDBRow>

            <MDBRow className='justify-content-center'>
                <MDBCol md='3'><p ><h1>OUR SERVICES</h1></p></MDBCol>
            </MDBRow>
            <MDBRow>
                <div className='d-flex justify-content-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star m-1" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star m-1" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star m-1" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star m-1" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star m-1" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                </div>
            </MDBRow>
            <MDBRow>  <br></br> <br></br>  </MDBRow>
            <MDBRow>
                <MDBCol md='4' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' style={{ backgroundColor: 'lightgray', boxShadow: '6px 6px 9px #3c3d3c' }}>
                        <Card.Body >
                            <Card.Title className="fst-italic"><h4>PROFESSIONAL APPROACH</h4></Card.Title>

                            <Card.Text className="fs-8 lh-lg fw-light">
                                What does professional attitude mean to us? The fact that you come with certain requirements. We will listen to them, understand them and start implementing them.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBCol md='4' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' style={{ backgroundColor: 'lightgray', boxShadow: '6px 6px 9px #3c3d3c' }}>
                        <Card.Body>
                            <Card.Title className="fst-italic"><h4>PERSONIFICATION</h4></Card.Title>

                            <Card.Text className="fs-8 lh-lg fw-light">
                                Every client is unique to us and therefore we know that we need to treat him as unique. We listen to his demands and implement them. Our goal is your satisfaction.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBCol md='4' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' style={{ backgroundColor: 'lightgray', boxShadow: '6px 6px 9px #3c3d3c' }}>
                        <Card.Body>
                            <Card.Title className="fst-italic"><h4>SPEED</h4></Card.Title>

                            <Card.Text className="fs-8 lh-lg fw-light">
                                It is said that it is worth waiting for good things, but that is not the case. We want you to have the best and do it as quickly as possible. That's why we work fast and full.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
            </MDBRow>
            <MDBRow>  <br></br> <br></br>  </MDBRow>
            <MDBRow>
                <MDBCol md='4' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' style={{ backgroundColor: 'lightgray', boxShadow: '6px 6px 9px #3c3d3c' }}>
                        <Card.Body>
                            <Card.Title className="fst-italic"><h4>ALL LEBANON</h4></Card.Title>

                            <Card.Text className="fs-8 lh-lg fw-light">
                                Beirut, Tripoli, or Tyre? Where do you want your warehouse to be? You have a great choice with us. We offer you a whole country full of possibilities - Lebanon.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBCol md='4' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' style={{ backgroundColor: 'lightgray', boxShadow: '6px 6px 9px #3c3d3c' }}>
                        <Card.Body>
                            <Card.Title className="fst-italic"><h4>LEGAL SERVICE</h4></Card.Title>

                            <Card.Text className="fs-8 lh-lg fw-light">
                                As you may have understood, we want you to be taken care of as much as possible, even by law. We offer you the possibility of a complete legal service.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
                <MDBCol md='4' xs='10' >
                    <Card border="light" className='p-sm-3 p-1' style={{ backgroundColor: 'lightgray', boxShadow: '6px 6px 9px #3c3d3c' }}>
                        <Card.Body>
                            <Card.Title className="fst-italic"><h4>CONSULTATION SERVICES</h4></Card.Title>

                            <Card.Text className="fs-8 lh-lg fw-light">
                                We will take time for you whenever necessary to hear your requests. Communication is the key to success. We will be happy to provide you with the best solution.
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </MDBCol>
            </MDBRow>
            <MDBRow>  <br></br> <br></br>  </MDBRow>

            {/* <Footer/> */}
        </Container>
    );
}

export default AboutUs;

