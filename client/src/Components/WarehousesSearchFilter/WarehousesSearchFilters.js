import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import MultiRangeSlider from '../Slider/MultiRangeSlider';
import Form from 'react-bootstrap/Form'
import { DateRange } from 'react-date-range';
import { useState } from 'react';



const WarehousesSearchFilters = (props) => {
    const { priceMin, priceMax, spaceMin, spaceMax } = props.data

    return (

        <div className="d-flex justify-content-between px-3 mb-2">

            <div className="d-flex">
                <p className='fs-4'>Filter by: </p>

                <div className='ms-4'>

                    <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">Select Price Range</Popover.Header>
                                <Popover.Body>
                                    <MultiRangeSlider min={priceMin}
                                        max={priceMax}
                                        onChange={props.priceChange}  ></MultiRangeSlider>
                                    <br></br>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button variant="success"> Price Per Day</Button>
                    </OverlayTrigger>

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
                        <Button variant="success">Space</Button>
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
                        <Button variant="success">
                            Date
                        </Button>
                    </OverlayTrigger>

                </div>

            </div>


            <div className="d-flex">
                <p className='fs-4'>Sort By:</p>
                <div className='ms-3'>

                    <Form.Select aria-label="Default select example" onChange={(e) => { props.sortByAction(e.target.value) }} >
                        <option selected disabled hidden   >Select an Option</option>
                        <option value={'location'}>Nearest To Me</option>
                        <option value={'lowPrice'}>Lowest Price</option>
                        <option value={'highPrice'}>Highest Price</option>
                        <option value={'bigSpace'}>Biggest space</option>
                        <option value={'smallSpace'}>Smallest space</option>
                    </Form.Select>

                </div>
            </div>
        </div>
    )
}

export default WarehousesSearchFilters