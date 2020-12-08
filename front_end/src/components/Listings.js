import React from 'react';
import axios from 'axios';
import {setListings} from '../redux/actions/listingActions';

const listings = useSelector(state => state.listingReducer.listings);
    const dispatch = useDispatch();

    console.log('listings: ', listings);

    const getListings = () => {
        axios.get('/api/listings')
        .then( (res) => {
            dispatch( setListings(res.data.listings) );
        })
        .catch( (err) => {
            console.log('Something broke: ');
            console.log(err);
        });
        React.useEffect(getListings ,[]); //Returns all the listings
    };
    
    
    return (
        <div>
            <h1>Listings go here!</h1>
            {listings.map( (x,i) => (
                <Listing listings={x} />
            ))}
        </div>
    )