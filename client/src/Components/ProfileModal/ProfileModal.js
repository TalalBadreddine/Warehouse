import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "@mui/material"

const ProfileModal = (props) => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {

        let role = props.role == 'customer' ? 'user' : 'warehouseOwner'

        axios.post(`/${role}/profileModal`, {

            userEmail: props.userEmail

        }).then((results) => {

            setUserInfo(results.data)
            console.log(results.data)

        }).catch((err) => {
            console.log(err)
        })

    }, [])
    
    if(!userInfo){
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

    return(
        <div>
            <h1>{console.log(userInfo) && userInfo.email}</h1>
        </div>
    )
}

export default ProfileModal