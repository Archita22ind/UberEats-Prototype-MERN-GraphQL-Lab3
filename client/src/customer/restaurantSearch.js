import '../styling/customer/restaurantSearch.css';
import {Container, Row,Col , Form} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Icon from 'react-bootstrap-icons';
import RestaurantList from './restaurantList.js';
import React, { useState } from 'react';
import MainHeader from '../common/mainHeader';

const RestaurantSearch = props =>{

return (
<>
<MainHeader/>
<Container fluid className="mt-5">
<Row>
<Col xs={12} md={2}>
    <Row > 
        <Col><h4 style = {{
             'textAlign':  'left'
        }}>Filters</h4></Col>
    </Row>
    <Row >   
        <Col><h5 style= {{  
             'textAlign': 'left'
        }}>Dietary</h5></Col>
    </Row>
    <Row >   
 
        <Col xs={12} md={12} >  
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={<h6>Vegan Friendly</h6>} />
                                 </Form.Group>
        </Col>
        <Col xs={12} md={12} >
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={<h6>Vegetarian</h6>} />
                                 </Form.Group></Col>  
    </Row>
    <Row >   
        <Col xs={12} md={12} >  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={<h6>Non-Vegetarian</h6>}/>
                                 </Form.Group></Col>
        <Col xs={12} md={12} >
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={<h6>Halal</h6>}/>
                                 </Form.Group>
        </Col>
    </Row>
    <Row >   
    <Col xs={12} md={12} ><Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={<h6>Allergy Friendly</h6>}/>
                                 </Form.Group>
    </Col>
    <Col xs={12} md={12} ><Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label={<h6>Gluten-free</h6>}/>
                                 </Form.Group>
    </Col>  
    </Row>

</Col>
<Col xs={12} md={10}>
  <RestaurantList/>
</Col>
</Row>

</Container>
</>

);

}

export default RestaurantSearch;