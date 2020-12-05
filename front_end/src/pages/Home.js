// Create Homepage here
import React from 'react';

import ListingCreationForm from '../components/ListingCreationForm';
import Listings from '../components/Listings';

const Home = () => {
    return (
        <div>
            <hi>Home</hi>
            <ListingCreationForm />
            <Inquiries />
            <Listings />
        </div>
    )
}