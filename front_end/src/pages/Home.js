// Create Homepage here
import React from 'react';
/*Listing Imports*/
import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';
/*Bootstrap Imports*/
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
/*Redux Imports*/
import {useSelector, useDispatch} from 'react-redux';
import {setUserName, setIsLoggedIn } from '../redux/actions/userActions';
import {setListings} from '../redux/actions/listingActions';

const Home = () => {
    /*Redux variables*/
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userName = useSelector(state => state.userReducer.userName);
    const listings = useSelector(state => state.listingReducer.listings);
    const dispatch = useDispatch();


    console.log('listings: ', listings);

    const getListings = () => {
        axios.get('/.....')
        .then( (res) => {
            
        })
        dispatch( setListings(['hello', 'world']) );
    };
    React.useEffect(getListings ,[]);
    

    console.log("Someone logged in? "+ isLoggedIn);
    console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Username is : ${userName} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand color="white">Ghetto eBay</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="justify-content-start mr-auto">
                        <NavDropdown title="Create Post" id="basic-nav-dropdown">
                        Insert listingCreationForm.js here
                        </NavDropdown>
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
            <div className= "testing-redux">
                <p>Is there someone logged in? {isLoggedIn} </p>
                <h1>This is who's on: {userName}</h1>
            </div>
        </div>
    )
}

export default Home;