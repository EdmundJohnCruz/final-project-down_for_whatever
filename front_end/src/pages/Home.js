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

const Home = () => {
    /*Redux variables*/
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userName = useSelector(state => state.userReducer.userName);
    console.log("Someone logged in? "+ isLoggedIn);
    console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Username is : ${userName} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
    return (
        <div>
            <Navbar class="text-center" bg="light" expand="lg" sticky="top">
                <Navbar.Brand>Ghetto eBaytest</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Create Post" id="basic-nav-dropdown">
                            
                        </NavDropdown>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <NavDropdown title="Log In" id="basic-nav-dropdown" classname="mr-sm-2">
                            <NavDropdown.Item>Log In</NavDropdown.Item>
                            
                            <NavDropdown.Item href="/signup">Need An Account?</NavDropdown.Item>
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