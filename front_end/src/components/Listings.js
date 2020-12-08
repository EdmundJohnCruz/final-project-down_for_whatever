import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';

const dispatch = useDispatch();

const getListings = () => {
    axios.get('http://localhost:4001/listings')
        .then((res) => {
            dispatch(setListings(res.data.listings));
        })
        .catch((err) => {
            console.log('Something broke: ');
            console.log(err);
        });
};
React.useEffect(getListings, []); //Returns all the listings


const Listings = () => {
    const listings = useSelector(state => state.listingReducer.listings);
    return (
        <div>
            <h1>Listings go here!</h1>
            {listings.map((x, i) => (
                listings = { x } //Either put JSX stuff here or another file that passes JSX 
            ))}
        </div>
    )
}
export default Listings;