import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ui from '../../themes'

const ProfileModal = (props) => {
    const [userInfo, setUserInfo] = useState(null)
    const [userOtherInfo, setUserOtherInfo] = useState(null)

    useEffect(() => {

        let role = props.role == 'customer' ? 'user' : 'warehouseOwner'

        axios.post(`/${role}/profileModal`, {

            userEmail: props.userEmail

        }).then((results) => {

            setUserInfo(results.data.personalInfo)
            setUserOtherInfo(results.data.otherInfo)

        }).catch((err) => {
            console.log(err)
        })

    }, [])

    if (!userInfo || !userOtherInfo) {
        return (
            <div>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />

            </div>
        )
    }

    return (
        <div>
            <div className="d-flex">
                <div>
                    <img src={`${userInfo.image}`} width={'100px'} height={'100px'} style={{ borderRadius: '100%' }}></img>
                </div>
                <div className="mt-4 ms-4 d-flex justify-content-between col-9">
                    <div className="col-5">
                        <p><span style={{ fontWeight: 'bold' }}>User name:</span><span className="ms-2">{userInfo.userName}</span></p>
                        <p><span style={{ fontWeight: 'bold' }}>Email:</span><span className="ms-2">{userInfo.email}</span></p>
                    </div>
                    <div  className="col-5">
                        <p><span style={{ fontWeight: 'bold' }}>Status:</span><span className="ms-2" style={{color: userInfo.isActive ? 'green' : 'red' }}>{userInfo.isActive ? 'Active' : 'Deactive'}</span></p>
                        <p><span style={{ fontWeight: 'bold' }}>Member Since:</span><span className="ms-2">{new Date(userInfo.registrationDate).toISOString().slice(0, 10)}</span></p>
                    </div>
                </div>

            </div>

            <div className="mt-4">
                <h2 className="mb-3">Warehouses {props.role == 'customer' ? '' : 'Requests'}</h2>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: `${ui.borders}` }}>
                        <TableRow>
                            <TableCell style={{ color: `${ui.normalText}`, fontSize: '1rem' }}>Provider</TableCell>
                            <TableCell style={{ color: `${ui.normalText}`, fontSize: '1rem' }} align="center">Warehouse name</TableCell>
                            <TableCell style={{ color: `${ui.normalText}`, fontSize: '1rem' }} align="center">Status</TableCell>
                            <TableCell style={{ color: `${ui.normalText}`, fontSize: '1rem' }} align="center">Start rent date</TableCell>
                            <TableCell style={{ color: `${ui.normalText}`, fontSize: '1rem' }} align="center">End rent date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: `${ui.lightBg}` }}>
                        {userOtherInfo.map((warehousesRequests) => (
                            <TableRow
                                key={warehousesRequests.warehouseOwnerName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" style={{ color: `${ui.normalText}` }} component="th" scope="row">
                                    <div className="d-flex">
                                        <img src={warehousesRequests.ownerImage} width='50px' height={'50px'} style={{ borderRadius: '100%' }}></img>
                                        <span className="my-auto ms-2"> {warehousesRequests.warehouseOwnerName}</span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ color: `${ui.normalText}` }} component="th" scope="row">{warehousesRequests.warehouseName}</TableCell>
                                <TableCell style={{ color: `${ui.normalText}` }} align="center">{warehousesRequests.status}</TableCell>
                                <TableCell style={{ color: `${ui.normalText}` }} align="center"> {new Date(warehousesRequests.startRentDate).toISOString().slice(0, 10)}</TableCell>
                                <TableCell style={{ color: `${ui.normalText}` }} align="center">{new Date(warehousesRequests.endRentDate).toISOString().slice(0, 10)}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default ProfileModal