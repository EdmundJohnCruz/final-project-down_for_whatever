import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Modal, Breadcrumb, Badge } from 'react-bootstrap';

const GetListing = ({ listing }) => {

  const [modalShow, setModalShow] = React.useState(false);

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
        <Badge className="float-left">ID : ${listing._id}</Badge>
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
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Body className="text-muted">
          This button should take you to a page dedicated to the post you clicked on.<br/>
          Not implemented yet.<br/>
          Probably where you can send the first inquiry also?
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

const mapStateToProps = state => ({
  dispatch: state.dispatch
});

export default connect(mapStateToProps)(GetListing);