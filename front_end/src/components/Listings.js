import React from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setListings} from '../redux/actions/listingActions';
import GetListings from './GetListings'

const Listings = () => {
  const dispatch = useDispatch(); 
  const listings = useSelector(state => state.listingReducer.listings);
  const getListings = () => {
    axios.get('http://localhost:4001/listings')
    .then( (res) => {
      console.log(res.data)
        dispatch(setListings(res.data.listings));
    })
    .catch( (err) => {
      console.log('Something broke abc :( :');
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