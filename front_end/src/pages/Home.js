// Create Homepage here
import React from 'react';
/*Components Imports*/
import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';
import Login from '../components/Login';
import Inquiries from '../components/Inquiries';
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
import { setShowLCF } from '../redux/actions/modalActions';
import { setShowMainDisplay } from '../redux/actions/showMainDisplay';

const Home = () => {
    /*Redux variables*/
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const navSignInButtonTitle = isLoggedIn ? "Account" : "Log In";
    const userName = useSelector(state => state.userReducer.userName);
    const showMainDisplay = useSelector(state => state.mainDisplayReducer.showMainDisplay);
    const showLCFModal = useSelector(state => state.modalReducer.showLCF);
    const dispatch = useDispatch();

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand color="white" onClick={()=>dispatch(setShowMainDisplay("listings"))}>Ghetto eBay</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="justify-content-start mr-auto">
                        <Nav.Link title="Create Post" onClick={() => {dispatch(setShowLCF(true))}}>Create Post&nbsp;</Nav.Link>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" />
                            <Button variant="secondary">Search</Button>
                        </Form>
                    </Nav>
                    <Nav className="justify-content-end ml-auto">
                        <NavDropdown alignRight title={navSignInButtonTitle} id="dropdown-menu-" menualign="right">
                            <LoginOrSignout />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ListingCreationFormModal show={showLCFModal} onHide={() => {dispatch(setShowLCF(false))}} />

            {(showMainDisplay==="listings") && <Listings />}
            {(showMainDisplay==="inquiries") && <Inquiries />}
            {(showMainDisplay==="my listings") && <Listings />}
        </div>
    );

    function LoginOrSignout() {
        if (!isLoggedIn) {
            return (
                <div>
                    <Login />
                    <NavDropdown.Item href="/signup" className="text-center">Need An Account?</NavDropdown.Item>
                </div>
            )
        } else {
            return (
                <div className="text-center">
                    <NavDropdown.Item >Welcome : {userName}</NavDropdown.Item>
                    <NavDropdown.Item >My Listings</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>dispatch(setShowMainDisplay("inquiries"))}>Inquiries</NavDropdown.Item>
                    <Button onClick={() => {dispatch(setIsLoggedIn(false));dispatch(setUserName("Signed Out", null))}}>Sign Out</Button>
                </div>
            )
        }
    };

    function ListingCreationFormModal(props) {
        if (isLoggedIn) {
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
};

export default Home;