import React, { useState } from 'react';
import {Container, Row,Col , ToggleButtonGroup, ToggleButton, Button, Form, FormControl} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Icon from 'react-bootstrap-icons';
import Navbar from '../styling/Navbar.js';
import CartCheckoutModal from './cartCheckoutModal.js';
import { Link} from 'react-router-dom';

const MainHeader = props => {
    let locationName = 'San Jose';
    const [modalShow, setModalShow] = useState(false);

return (

<Container fluid className="my-3"
>
  <Row>
  <Col xs={3} md={1}>
   <Navbar/>
  </Col>
    <Col className="mt-3" xs={4} md={2}>
    <Link to = "/restaurantSearch" style={{ textDecoration: 'none', color: 'black' }} > <h3 >Uber Eats</h3> </Link></Col>
    <Col className="mt-3" xs={4} md={2}>
    <ToggleButtonGroup type="radio" name="options" defaultValue={1}
    // value={value} onChange={handleChange}
    >
      <ToggleButton variant="outline-dark" id="tbg-radio-1" value={1}>
      <font size= '2'> Delivery</font> 
      </ToggleButton>
      <ToggleButton  variant="outline-dark" id="tbg-radio-2" value={2}>
      <font size= '2'> Pickup</font>  
      </ToggleButton>
    </ToggleButtonGroup>
    </Col>
    <Col className="mt-3" xs={4} md={2}><Button variant="outline-dark"><Icon.GeoAltFill/> <font size= '2'> {locationName}</font></Button></Col>
    <Col className="mt-3" xs={12} md={3}>
    <Typeahead id="id123"
    onChange={(selected) => {
        // this.setState({selected});
             }}
             options={[]}
        selected={[]}
            />
    </Col>
    <Col className="mt-3" xs={4} md={2}>
    <Button variant="dark" onClick={() => setModalShow(true)} ><Icon.CartPlus/>
     <font size= '2'> Cart</font>
    </Button>
    <CartCheckoutModal show={modalShow} onHide={() => setModalShow(false)} />
   </Col>
  </Row>    
</Container>
);



}

export default MainHeader;