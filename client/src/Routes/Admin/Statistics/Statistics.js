import { useEffect, useState } from 'react';
import CustomChart from '../../../Components/CustomChart/CustomChart';
import ui from '../../../themes'
import axios from 'axios'


const Statistics = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [allData, setAllData] = useState()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const showDateRange = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {

        axios.get('/admin/getAllStatistics').then((results) => {
            let data = results.data

            // @ [type, [arr], arr Of 11 for months]
            let arrOfAllObjects = Object.keys(data).map((key) => {
                let arr = new Array(11)

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = []
                }

                return ([key, data[key], arr, 0])
            })

            let currentYear = new Date().getFullYear()

            for (let i = 0; i < arrOfAllObjects.length; i++) {
                let currentObject = arrOfAllObjects[i]

                currentObject[1].map((element) => {
                    let year = parseInt(element.registrationDate.split('T')[0].split('-')[0])
                    if (year < currentYear) return
                    currentObject[2][getMonthIndexFromDate(element.registrationDate)].push(element)
                    if(Math.floor( (new Date().getTime() - new Date(element.registrationDate).getTime())/(1000*60*60*24) ) < 1){
                        currentObject[3]++
                    }
                })

            }
            console.log(arrOfAllObjects)
            setAllData(arrOfAllObjects)

        })

    }, [])


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>

            {/* @Dashboard */}
            <div>

                {/* @ */}
                <div className='col-12 d-flex justify-content-between m-auto mt-4 px-3 '>

                    {allData &&
                        <div className='col-12 d-flex justify-content-between '>

                            <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                                <CustomChart graphType={'line'} graphTitle="" idHelper={`${allData[0][0]}`} graphData={allData[0][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                                <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[0][3] > 0 ? `We have ${allData[0][3]} new users  Today ` : 'No new Users' }</p>
                            </div>



                            <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                                <CustomChart graphType={'line'} graphTitle="" idHelper={`${allData[1][0]}`} graphData={allData[1][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                                <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[1][3] > 0 ? `We have ${allData[1][3]} new warehouse owners Today ` : 'No new warehouse owners today ' }</p>
                            </div>



                            <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                                <CustomChart graphType={'line'} graphTitle="" idHelper={`${allData[2][0]}`} graphData={allData[2][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                                <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[2][3] > 0 ? `We have ${allData[2][3]} new requests to rent a warehouse  Today ` : 'No new requests today' }</p>
                            </div>



                            <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                                <CustomChart graphType={'line'} graphTitle="" idHelper={`${allData[3][0]}`} graphData={allData[3][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                                <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[3][3] > 0 ? `We have ${allData[3][3]} new warehouses added Today ` : 'No new warehouses added today' }</p>
                            </div>


                        </div>
                    }


                    {/* 
                    <div style={{width:'23%'}} className='bg-primary'>
                            <h1>test2</h1>
                    </div>

                    <div style={{width:'23%'}} className='bg-primary'>
                            <h1>test3</h1>
                    </div>

                    <div style={{width:'23%'}} className='bg-primary'>
                            <h1>test4</h1>
                    </div> 
                    */}

                </div>


            </div>

        </div>
    )
}

const getDateDifference = (date1, date2) => {
    let firstDateInSeconds = new Date(date1).getTime()
    let secondDateInSeconds = new Date(date2).getTime()

    return firstDateInSeconds - secondDateInSeconds
}

const getMonthIndexFromDate = (date) => {
    return (parseInt(date.split('T')[0].split('-')[1]) - 1)
}

export default Statistics