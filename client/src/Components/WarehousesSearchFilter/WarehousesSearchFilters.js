import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import MultiRangeSlider from '../Slider/MultiRangeSlider';


const WarehousesSearchFilters = (props) => {
    console.log(props.data)
    const {priceMin, priceMax} = props.data
    return (

        <div className="d-flex justify-content-between px-3 mb-2">

            <div className="d-flex">
                <p className='fs-4'>Filter by: </p>

                <div className='ms-5'>

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
                        <Button variant="success"> Price</Button>
                    </OverlayTrigger>

                </div>

                <div className='ms-5'>

                    <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">{`Popover bottom`}</Popover.Header>
                                <Popover.Body>
                                    <strong>Holy guacamole!</strong> Check this info.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button variant="secondary">Popover on bottom</Button>
                    </OverlayTrigger>

                </div>

                <div className='ms-5'>

                    <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">{`Popover bottom`}</Popover.Header>
                                <Popover.Body>
                                    <strong>Holy guacamole!</strong> Check this info.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button variant="secondary">Popover on bottom</Button>
                    </OverlayTrigger>

                </div>

            </div>


            <div className="d-flex">
                <p className='fs-4'>Sort By:</p>
                <div className='ms-3'>

                    <OverlayTrigger
                        trigger="click"
                        placement='right'
                        overlay={
                            <Popover id={`popover-positioned-bottom`}>
                                <Popover.Header as="h3">{`Popover bottom`}</Popover.Header>
                                <Popover.Body>
                                    <strong>Holy guacamole!</strong> Check this info.
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <Button variant="secondary">Popover on bottom</Button>
                    </OverlayTrigger>

                </div>
            </div>
        </div>
    )
}

export default WarehousesSearchFilters