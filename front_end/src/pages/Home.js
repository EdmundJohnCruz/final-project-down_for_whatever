// Create Homepage here
import React from 'react';
/*Listing Imports*/
import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';
import Login from '../components/Login';
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
    const [navSignInButtonTitle, setnavSignInButtonTitle] = React.useState("Log In");

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand color="white">Ghetto eBay</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="justify-content-start mr-auto">
                        <Nav.Link title="Create Post" onClick={() => setlcfModalShow(true)}>Create Post&nbsp;</Nav.Link>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" />
                            <Button variant="secondary">Search</Button>
                        </Form>
                    </Nav>
                    <Nav className="justify-content-end ml-auto">
                        <NavDropdown alignRight title={navSignInButtonTitle} id="dropdown-menu-" menuAlign="right">
                            <LoginOrSignout />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ListingCreationFormModal show={lcfmodalShow} onHide={() => setlcfModalShow(false)} />

            <Listings />
        </div>
    )

    function LoginOrSignout() {
        if (!isLoggedIn) {
            setnavSignInButtonTitle("Log In");
            return (
                <div>
                    <Login />
                    <NavDropdown.Item href="/signup" className="text-center">Need An Account?</NavDropdown.Item>
                </div>
            )
        } else {
            setnavSignInButtonTitle("Account");
            return (
                <div className="text-center">
                    <NavDropdown.Item >Welcome : {userName}</NavDropdown.Item>
                    <NavDropdown.Item >My Listings</NavDropdown.Item>
                    <NavDropdown.Item >Inquiries</NavDropdown.Item>
                    <Button onClick={() => {dispatch(setIsLoggedIn(false));dispatch(setUserName("Signed Out"))}}>Sign Out</Button>
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