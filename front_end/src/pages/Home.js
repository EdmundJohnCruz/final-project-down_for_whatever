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
import 'bootstrap/dist/css//bootstrap.min.css'; //imports css needed for bootstrap to work

const Home = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand>Ghetto eBaytest</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavDropdown title="Create Post" id="basic-nav-dropdown">
                        Insert listingCreationForm.js here
                        </NavDropdown>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        </Nav>
                        <div className="justify-content-end">
                        <Nav>
                        <NavDropdown title="Log In" id="basic-nav-dropdown">
                            <NavDropdown.Item></NavDropdown.Item>
                            <Form inline>
                                <div className="text-center">
                                Username:
                                <FormControl type="text" placeholder="Username" />
                                Password:
                                <FormControl type="text" placeholder="Password" />
                                </div>
                            </Form>
                            <NavDropdown.Item href="/signup" className="text-center">Need An Account?</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Home;