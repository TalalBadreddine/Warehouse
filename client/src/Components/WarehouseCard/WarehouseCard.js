import { BiCctv } from 'react-icons/bi'
import { Carousel } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import sprinkler from './sprinkler.png'
import { TbForklift } from 'react-icons/tb'
import { GrUserWorker } from 'react-icons/gr'
import styles from './WarehouseCardCss.module.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button'

import ac from './air-conditioner.png'

const WarehouseCard = () => {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Simple tooltip
        </Tooltip>
    );


    return (
        <div className="col-5 m-2 p-2 d-sm-flex border rounded border-dark d-block col-sm-10 ">

            <div className='col-sm-4 '>
                <Carousel>
                    <Carousel.Item>

                        <img
                            // className='h-90'
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp5RIT9h5dgyVUm3bEvdZqxsgeL10flNzipnGRwuUI6pdjsYpVFZAi37IBniNaJ_2Go0g&usqp=CAU"
                            alt="First slide"
                        // width={'200px'}
                        height={'160px'}
                        />

                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="ms-sm-2 col-sm-8 p-sm-2 p-1 col-12 ">
                <h1 className={styles.bigTypo}>Warehouse Name, Country   </h1>
                <h1 className={styles.smallTypo} style={{ color: 'gray' }}>address: Beirut, Lebanon </h1>
                <div className='mt-3'>

                    <BiCctv style={{ color: 'black' }} className={`font-wight-700 m-2 ${styles.cctvIcon}`} size={27} ></BiCctv>

                    <img src={sprinkler} width={'25px'} className="m-2"></img>
           

                    <TbForklift style={{ color: 'gray' }} className="font-wight-700 m-2" size={32} ></TbForklift>
                   

                    <GrUserWorker style={{ color: 'black' }} className="font-wight-700 m-2" size={26}></GrUserWorker>
           

                    <img src={ac} width={'37px'} style={{ opacity: 0.4 }} className="m-2 mt-3"></img>




                </div>


            </div>
        </div>
    )
}

export default WarehouseCard