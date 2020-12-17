import React from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Modal, Form, FormControl, InputGroup, Breadcrumb, Badge } from 'react-bootstrap';
//import ListingCreationForm from './ListingCreationForm';
//  redux imports
import { connect, useSelector, useDispatch } from 'react-redux';

const url = "/api/listingserver/editListing";
const delURL = "/api/listingserver/:listing_id";
const sendInquiryURL = "/api/inquiryserver/inquiry";

const GetListing = ({ listing }) => {

  const [moreDetailsModalShow, setMoreDetailsModalShow] = React.useState(false);

  return (
    <Card border="secondary" style={{ margin: "15px", }}>
      <Card.Header as="h4">&nbsp;{listing.title}
        <Breadcrumb.Item className="float-right small">Posted By: {listing.userid} </Breadcrumb.Item>
      </Card.Header>
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
        <Button className="float-right" variant="secondary" onClick={() => setMoreDetailsModalShow(true)}>More Detail</Button>
      </Card.Footer>
      <MoreDetails show={moreDetailsModalShow} onHide={() => setMoreDetailsModalShow(false)} />
    </Card>
  );

  function MoreDetails(props) {
    const [lefmodalShow, setlefModalShow] = React.useState(false);
    const [delmodalShow, setdelModalShow] = React.useState(false);
    const [inqmodalShow, setinqModalShow] = React.useState(false);

    return (
      <Modal {...props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Body className="text-muted">
            <p>Listing ID : {listing._id} </p>
            <p>Listing Timestamp : {listing.timestamp} </p>
            <p>Listing Title  : {listing.title} </p>
            <p>Listing Description : {listing.description} </p>
            <p>Listing Price : {listing.price} </p>
            <div>
              <Button variant="secondary" onClick={() =>
                setinqModalShow(true)
              }>
                Make Inquiry
            </Button>
              <Button variant="secondary" onClick={() =>
                console.log('Pain')
              }>
                View Inquiries
            </Button>
              <Button variant="secondary" onClick={() =>
                setlefModalShow(true)
              }>
                Edit Post
            </Button>
              <Button variant="secondary" onClick={() =>
                setdelModalShow(true)
              }>Delete Post
            </Button>
            </div>
          </Modal.Body>
        </Modal.Header>
        <ListingEditingForm show={lefmodalShow} onHide={() => setlefModalShow(false)} />
        <DeleteForm show={delmodalShow} onHide={() => setdelModalShow(false)} />
        <MakeInquiryForm show={inqmodalShow} onHide={() => setinqModalShow(false)} />
      </Modal>
    )
  }

  function MakeInquiryForm(props) {
    const [message, setMessage] = React.useState("");

    const userName = useSelector(state => state.userReducer.userName);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

    const sendInquiry = e => {
      e.preventDefault();
      const inquiry = {
        buyerId: userName,
        sellerId: listing.userid,
        listingId: listing._id,
        listingTitle: listing.title,
        message: message,
      }
      axios.post(sendInquiryURL, { inquiry: inquiry })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(inquiry)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
    };

    if (isLoggedIn) {
      return (
        <Modal {...props} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Body>
              <div className="ListingCreationForm">
                <Form onSubmit={sendInquiry}>
                  <h1>Send a message to {listing.userid} about {listing.title}</h1>

                  <Form.Group>
                    <Form.Control placeholder="Type your message here ..." as="textarea" rows={2} value={message} onChange={(e) => setMessage(e.target.value)} required />
                  </Form.Group>

                  <button type="submit" class="btn btn-primary float-right">Send</button>
                </Form>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      )
    } else {
      return (
        <Modal {...props} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              You must be logged in to make an inquiry.
            </Modal.Title>
          </Modal.Header>
        </Modal>
      )
    }
  }

  function DeleteForm(props) {

    const userName = useSelector(state => state.userReducer.userName);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

    const deleteListing = e => {
      axios.delete(`/api/listingserver/${listing._id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    if (isLoggedIn) {
      return (
        <Modal {...props} size="md" centered>
          <Modal.Header closeButton>
            <div className="delForm">
              <Form onSubmit={deleteListing}>
                <h3>Are you sure you wish to delete this post?</h3>
                <button type="submit" class="btn btn-secondary float-right">Yes</button>
              </Form>
            </div>
          </Modal.Header>
        </Modal>
      )
    } else {
      return (
        <Modal {...props} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              You cannot delete this post.
            </Modal.Title>
          </Modal.Header>
        </Modal>
      )
    }
  }

  function ListingEditingForm(props) {

    const [title, setTitle] = React.useState(listing.title);
    const [description, setDescription] = React.useState(listing.description);
    const [price, setPrice] = React.useState(listing.price);

    const userName = useSelector(state => state.userReducer.userName);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

    const editListing = e => {
      e.preventDefault();
      const data = {
        userid: userName,
        title: title,
        description: description,
        price: price,
        _id: listing._id,
      }
      axios.post(url, { listing: data })
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
                    <Form.Control id="title" type="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label class="font-weight-bold">Description</Form.Label>
                    <Form.Control id="description" type="description" as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label class="font-weight-bold">Price</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl id="price" type="number" value={price} step=".01" pattern="^\d+(?:\.\d{1,2})?$" onChange={(e) => setPrice(e.target.value)} required />
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
    } else {
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
  }

}

const mapStateToProps = state => ({
  dispatch: state.dispatch
});

export default connect(mapStateToProps)(GetListing);