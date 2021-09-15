import {Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { Link} from 'react-router-dom';

const restaurantList = ["Chennai Kings", "Subway", "Mc Donalds", "Chat House", "Chat Corner", "Paradise Biryani", "Jakes", "Five Guys"];



const RestaurantList = () => {  
    
    return <Row >
        {restaurantList.map (
    
        (restaurant, index) => {
        
        return ( 
            <Col xs={6} md={3} className="mb-4">
                <Link to = "/restaurantDetails"> 
                <Card  border="dark" >
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                        <Card.Title>{restaurant}</Card.Title>
                        <Card.Text>
                        {restaurant}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
           </Col>   
    
    );
    
    })} </Row>
}

export default RestaurantList;