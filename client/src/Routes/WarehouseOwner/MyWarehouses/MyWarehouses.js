import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import WarehouseCard from "../../../Components/WarehouseCard/WarehouseCard"

const MyWarehouses = () => {

    const [myWarehouses, setMyWarehouses] = useState()
    const navigate = useNavigate()

    useEffect( () => {
        axios.get('/warehouseOwner/').then((results) => {
            let warehouses = results.data
            if(warehouses == 'forbidden'){navigate('/')}
            setMyWarehouses(warehouses) 
        }).catch((err) => {
            if(err.response.data == 'forbidden'){navigate('/')}
        })

    },[])

    return(
        <div className=" col-8 justify-content-center m-auto mt-4">
            <div>
                <div className="d-flex justify-content-center mb-4 ">
                    <Button style={{
                        backgroundColor:'#027fff !important'
                    }} onClick={() => {navigate('/owner/addWarehouse')}}> Add Warehouse</Button>
                </div>
                <div  >
                   { myWarehouses && myWarehouses.map((warehouse) => {
                    return(
                        <div className="m-2">
                            <WarehouseCard info={warehouse} role={'owner'} ></WarehouseCard>
                        </div>
                    )
                   })}
                </div>

            </div>
        </div>
    )
}

export default MyWarehouses