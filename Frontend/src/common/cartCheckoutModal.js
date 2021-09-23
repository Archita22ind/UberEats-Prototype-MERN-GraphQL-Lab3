import {Container, Row,ListGroup , Col, Modal, Button, DropdownButton, Dropdown} from 'react-bootstrap';


const CartCheckoutModal = (props) => {

    const restaurantName = "Jakes Pizza";
    const totalPrice = 55.67;
    const selectedItems = ['Burger', 'Pizza', 'Beer']

    const displaySelectedItems = () => {

         return (selectedItems.map( (item) => {
            return (
                <ListGroup.Item xs={12} md={12} action href="#link1">
                    {populateQuantityDropdown()}
                     {item}
              </ListGroup.Item>
            );

        })
         );
    };


    return (
     
     
     <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {restaurantName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
          <ListGroup defaultActiveKey="#link1">
          {displaySelectedItems()}
            </ListGroup>
          </Container>
        </Modal.Body>   
        <Modal.Footer>
          <Button variant="dark" onClick={props.onHide}>Go to checkout - ${totalPrice}</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const getClickedQuantity = (name) => console.log(name);

  const populateQuantityDropdown = () => {
    const selectedQuantity = 1;
    return (
        <DropdownButton variant="secondary" id="dropdown-basic-button" title={selectedQuantity}>
        <Dropdown.Item href="#/action-1" eventKey="1" onClick={e => getClickedQuantity(e.target.value)}>1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3</Dropdown.Item>
        </DropdownButton>

    );
  }



  export default CartCheckoutModal;





//   <ListGroup.Item action href="#link1">
//   Link 1
// </ListGroup.Item>
// <ListGroup.Item action href="#link2" disabled>
//   Link 2
// </ListGroup.Item>
// <ListGroup.Item action onClick={alertClicked}>
//   This one is a button
// </ListGroup.Item>