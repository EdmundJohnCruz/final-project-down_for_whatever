// Create Homepage here
import React from 'react';
/*Listing Imports*/
import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';
import GetListings from '../components/GetListings';
/*Bootstrap Imports*/
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
/*Redux Imports*/
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn } from '../redux/actions/userActions';
import { setListings } from '../redux/actions/listingActions';

const Home = () => {
    /*Redux variables*/
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userName = useSelector(state => state.userReducer.userName);
    const listings = useSelector(state => state.listingReducer.listings);
    const dispatch = useDispatch();

    const [lcfmodalShow, setlcfModalShow] = React.useState(false);
    const [loginmodalShow, setloginModalShow] = React.useState(false);  //  not implemented yet

    console.log("Someone logged in? " + isLoggedIn);
    console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Username is : ${userName} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand color="white">Ghetto eBay</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="justify-content-start mr-auto">
                        <NavDropdown title="Create Post" id="basic-nav-dropdown">
                            <ListingCreationForm />
                        </NavDropdown>
                        <Nav.Link onClick={() => setlcfModalShow(true)}>Create Post</Nav.Link>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" />
                            <Button variant="secondary">Search</Button>
                        </Form>
                    </Nav>
                    <Nav className="justify-content-end ml-auto">
                        <NavDropdown alignRight title="Log In" id="dropdown-menu-" menuAlign="right">
                            <Form inline>
                                <div className="text-center">
                                    Username:
                                <FormControl type="text" placeholder="Username" />
                                Password:
                                <FormControl type="text" placeholder="Password" />
                                    <Button className="justify-content-center">Log In</Button>
                                </div>
                            </Form>
                            <NavDropdown.Item href="/signup" className="text-center">Need An Account?</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ListingCreationFormModal show={lcfmodalShow} onHide={() => setlcfModalShow(false)} />

            <div className="testing-redux">
                <p>Is there someone logged in? {isLoggedIn} </p>
                <h1>This is who's on: {userName}</h1>
            </div>
            <Listings />
        </div>
    )
}

function ListingCreationFormModal(props) {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    if (!isLoggedIn) {
        return (
            <Modal {...props} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Body>
                        <ListingCreationForm />
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        )
    } else {
        return (
            <Modal {...props} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        You must be logged in to create a post.
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
};

export default Home;