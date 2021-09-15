import { useState, useEffect} from 'react';
import {Button, Row,Col, Form, Container} from 'react-bootstrap';

const SignUp = props => {


const [restaurantDetails,setRestaurantDetails]=useState({})


console.log(restaurantDetails);

const onChangeHandler =(event)=>{
    event.preventDefault();

    setRestaurantDetails( (prevState)=>{
        return(
            {
                ...prevState,
                [event.target.name] : event.target.value
            }
        );

    })

}

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://10.0.0.8:8080/restaurantSignUpInfo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      ...restaurantDetails
                  })
                });
    
                const data = await response.json();
                // enter you logic when the fetch is successful
                   console.log(data);

        } catch (error){
            console.log(error);
        }
    };  

    

  return (

<Container>
    <Row className="m-3">
        <Col style={{backgroundColor: 'grey'}}>
        <p>Uber Eats for Restaurants</p>
        </Col>
    </Row>
    <Row>
      <Col md ={3}> </Col>
      <Col md ={6}>
   <Form  onSubmit={onSubmitHandler}>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control name="emailId" type="email" placeholder="Enter email" onChange= {onChangeHandler}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" placeholder="Password" onChange= {onChangeHandler}/>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control name="address" placeholder="1234 Main St"  onChange= {onChangeHandler} />
  </Form.Group>

  {/* <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group> */}

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Select defaultValue="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Row>

  <Button variant="dark" type="submit">
    Sign Up
  </Button>

</Form>

      </Col>
     
     
      <Col md ={3}></Col>
    </Row>


</Container>

  );









};


export default SignUp;