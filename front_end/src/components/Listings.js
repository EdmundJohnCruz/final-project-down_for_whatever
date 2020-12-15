import React from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListings} from '../redux/actions/listingActions';
import GetListings from './GetListings'

const Listings = () => {
  const dispatch = useDispatch(); 
  const listings = useSelector(state => state.listingReducer.listings);
  const getListings = () => { // also called in index.js
    axios.get('/api/listingserver/listings')
    .then( (res) => {
      console.log('updating listings: ', res.data)
        dispatch(setListings(res.data.listings));
    })
    .catch( (err) => {
      console.log('update listings failed in Listings.js:');
      console.log(err);
    })
  };

  React.useEffect(getListings, []);


  return (
    <div>
      <h1>Listings :</h1>
      {listings.map( (x,i) => (
        <GetListings listing={x} />
      ))}
    </div>
  );
};

export default Listings;