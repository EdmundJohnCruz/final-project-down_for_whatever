// Create Homepage here
import React from 'react';

import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
//import Container from '/react-bootstrap/Container';
import 'bootstrap/dist/css//bootstrap.min.css'; //imports css needed for bootstrap to work

const Home = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="#home">Ghetto eBay</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Create Post" id="basic-nav-dropdown">
                        </NavDropdown>
                        <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        <NavDropdown title="Log In" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Log In</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/signup">Need An Account?</NavDropdown.Item>   
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Home;