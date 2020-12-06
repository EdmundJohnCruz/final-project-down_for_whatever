// Create Homepage here
import React from 'react';

import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css//bootstrap.min.css'; //imports css needed for bootstrap to work

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <ListingCreationForm />
            <Inquiries />
            <Listings />
        </div>
    )
}

export default Home;