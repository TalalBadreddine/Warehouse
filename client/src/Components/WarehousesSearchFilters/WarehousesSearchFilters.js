import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
import MultiRangeSlider from '../Slider/MultiRangeSlider';
import Form from 'react-bootstrap/Form'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import ui from '../../themes'
import { Popover } from '@mui/material';
import * as React from 'react'



const WarehousesSearchFilters = (props) => {
    const { priceMin, priceMax, spaceMin, spaceMax } = props.data

    const [priceAnchor, setPriceAnchor] = React.useState(null);

    const [spaceAnchor, setSpaceAnchor] = useState(null)


    return (

        <div className="d-flex justify-content-between px-3 mb-2">

            <div className="d-flex">
                <p style={{ color: `${ui.normalText}` }} className='fs-4'>Filter by: </p>

                <div className='ms-4'>
                    <Button style={{ backgroundColor: `${ui.Buttons}` }} className='Buttons' onClick={(event) => setPriceAnchor(event.currentTarget)}> Price Per Day</Button>

                    <Popover
                        id={Boolean(priceAnchor)? 'simple-popover' : undefined}
                        open={Boolean(priceAnchor)}
                        anchorEl={priceAnchor}
                        onClose={ () => setPriceAnchor(null)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}

                    >
                        <div style={{ width: '270px', height: '100px' }}>
                            <div className='col-12 mt-3'>
                                <h5 className='ms-3'>Price Per Day</h5>
                                <hr></hr>

                                <div className='bg-primary'>
                                    <MultiRangeSlider min={priceMin}
                                        max={priceMax}
                                        onChange={props.priceChange}
                                    ></MultiRangeSlider>
                                </div>
                            </div>
                        </div>

                    </Popover>


                    {/* <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">Select Price Range</Popover.Header>
                                <Popover.Body>
                                    
                                    <br></br>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button style={{ backgroundColor: `${ui.Buttons}` }} className='Buttons'> Price Per Day</Button>
                    </OverlayTrigger> */}

                </div>

                <div className='ms-4'>

                    <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">Select Space Range</Popover.Header>
                                <Popover.Body>
                                    <MultiRangeSlider min={spaceMin}
                                        max={spaceMax}
                                        onChange={props.spaceChange} ></MultiRangeSlider>
                                    <br></br>                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button style={{ backgroundColor: `${ui.Buttons}` }} className='Buttons'>Space</Button>
                    </OverlayTrigger>

                </div>

                <div className='ms-4'>

                    <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">Select Date</Popover.Header>
                                <Popover.Body>

                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => props.setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={props.date}
                                        className="date"
                                        minDate={new Date()}
                                    />

                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button style={{ backgroundColor: `${ui.Buttons}` }} className='Buttons'>
                            Date
                        </Button>
                    </OverlayTrigger>

                </div>

            </div>


            <div className="d-flex">
                <p style={{ color: `${ui.normalText}` }} className='fs-4'>Sort By:</p>
                <div className='ms-3'>

                    <Form.Select style={{ backgroundColor: `${ui.searchesInput}`, color: `${ui.normalText}`, borderColor: `${ui.borders}` }} aria-label="Default select example" onChange={(e) => { props.sortByAction(e.target.value) }} >
                        <option selected disabled hidden value={'nothing'}   >Select an Option</option>
                        <option value={'location'}><p>Nearest To Me</p></option>
                        <option value={'lowPrice'}><p>Lowest Price</p></option>
                        <option value={'highPrice'}><p>Highest Price</p></option>
                        <option value={'bigSpace'}><p>Biggest space</p></option>
                        <option value={'smallSpace'}><p>Smallest space</p></option>
                    </Form.Select>

                </div>
            </div>
        </div>
    )
}

export default WarehousesSearchFilters