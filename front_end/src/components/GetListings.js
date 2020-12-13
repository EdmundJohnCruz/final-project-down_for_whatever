import React from 'react';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { Card, Row, Col, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
//import ListingCreationForm from './ListingCreationForm';

const url = "/api/listingserver/listing";

const GetListing = ({ listing }) => {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Card border="secondary" style={{ margin: "15px", }}>
      <Card.Header as="h4">&nbsp;{listing.title}</Card.Header>
      <Row className="no-gutters">
        <Col className="md-3 text-center">
          <Card.Img src="logo192.png" style={{ width: "100px", height: "100px" }} />
        </Col>
        <Card.Body class="col-md-8" style={{ padding: "10px" }}>
          <Card.Title>Description : </Card.Title>
          <Card.Text>{listing.description} </Card.Text>
          <Card.Subtitle className="text-muted">Tags : {listing.type}</Card.Subtitle>
        </Card.Body>
      </Row>
      <Card.Footer className="text-muted text-center" style={{ padding: "10px" }}>Price : ${listing.price}
        <Button className="float-right" variant="secondary" onClick={() => setModalShow(true)}>More Detail</Button>
      </Card.Footer>
      <TempModal show={modalShow} onHide={() => setModalShow(false)} />
    </Card>

    /*
      <div>
        <table className="listing">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Price</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{listing.description}</td>
              <td>{listing.type}</td>
              <td>{listing.price}</td>
              <td>{listing.title}</td>
            </tr>
          </tbody>
         </table>
        </div>

      */
  );
}

function TempModal(props) {
  
  const [lcfmodalShow, setlcfModalShow] = React.useState(false);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Body className="text-muted">
          This button should take you to a page dedicated to the post you clicked on.<br/>
          Not implemented yet.<br/>
          Probably where you can send the first inquiry also?
          <div>
          <Button variant="secondary" onClick={() => 
          console.log('Inquiries Button Pressed')
          }> Inquiries
          </Button>
          <Button variant="secondary" onClick={() => 
            setlcfModalShow(true)
          }>
            Edit Button</Button>
          <Button variant="secondary" onClick={() => 
            console.log('Delete Button Pressed')
          }>Delete Button</Button>
          </div>
        </Modal.Body>
      </Modal.Header>
      <ListingCreationFormModal show={lcfmodalShow} onHide={() => setlcfModalShow(false)} />
    </Modal>
  )
}

function ListingCreationFormModal(props, {listing}) {

const [title, setTitle] = React.useState();
const [description, setDescription] = React.useState();
const [price, setPrice] = React.useState();
const [userId, setUserId] = React.useState();

const userName = useSelector(state => state.userReducer.userName);
const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

const editListing = e => {
  e.preventDefault();
  const data = {
      userid: userId,
      title: title,
      description: description,
      price: price,
  }
  axios.post(url, { listing: data }) //Change the URL to the new backend one
      .then(res => console.log(res))
      .catch(err => console.log(err));
  console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(data)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
};

  if (isLoggedIn) {
      return (
          <Modal {...props} size="lg" centered>
              <Modal.Header closeButton>
                  <Modal.Body>
                  <div className="ListingCreationForm">
            <Form onSubmit={editListing}>
                <h1>Edit Current Listing</h1>
                <Form.Group>
                    <Form.Label class="font-weight-bold " >Title</Form.Label>
                    <Form.Control id="title" type="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Description</Form.Label>
                    <Form.Control id="description" type="description" as="textarea" rows={4} placeholder="Enter a Description : &#13;&#10; Hello" onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Price</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="price" type="number" placeholder="0.00" step=".01" pattern="^\d+(?:\.\d{1,2})?$" onChange={(e) => setPrice(e.target.value)} required />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Please Provide an Image for the Listing</Form.Label>
                    <Form.File type="image" label="Upload your image here" custom />
                </Form.Group>

                <button type="submit" class="btn btn-primary float-right">Edit Listing</button>
            </Form>
        </div>
                  </Modal.Body>
              </Modal.Header>
          </Modal>
      )
  }  else {
      return (
          <Modal {...props} size="lg" centered>
              <Modal.Header closeButton>
                  <Modal.Title>
                      You cannot edit this post.
              </Modal.Title>
              </Modal.Header>
          </Modal>
      )
  }
}; 

const mapStateToProps = state => ({
  dispatch: state.dispatch
});

export default connect(mapStateToProps)(GetListing);