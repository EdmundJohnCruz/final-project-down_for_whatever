import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setInquiries, setRecievedInquiries, setSentInquiries } from '../redux/actions/inquiryActions';
import { connect } from 'react-redux';
import { Card, Form, Modal } from 'react-bootstrap';
import InquiriesSentCard from './InquiriesSentCard';
import InquiriesRecievedCard from './InquiriesRecievedCard';

const Inquiries = ({ inquiries }) => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.userReducer.userName);
  const sentInquiries = useSelector(state => state.inquiryReducer.sentInquiries);
  const recievedInquiries = useSelector(state => state.inquiryReducer.recievedInquiries);

  //testing

  const placeholderInquiry1 = {
    buyerId: 'Buyer 1',
    sellerId: 'Seller 1',
    listingId: '5fd1927ce3f4ff7f572d985e',
    listingTitle: 'Baked Potatoes',
    message: 'Seeing if all fields are saved',
  }

  const placeholderInquiry2 = {
    buyerId: 'Buyer 2',
    sellerId: 'Seller 2',
    listingId: '5fcc09eeb9f6b6391cce6725',
    listingTitle: 'Phone for Sale Test',
    message: 'Hey, this is a test.',
  }

  const getInquiries = () => {
    axios.get('/api/inquiryserver/inquiries')
      .then((res) => {
        console.log('updating inquiries: ', res.data)
        dispatch(setInquiries(res.data.inquiry));
      })
      .catch((err) => {
        console.log('update inquiries failed in Inquiries.js:');
        console.log(err);
      })
  };

  const getSentInquiries = () => {
    axios.get(`/api/inquiryserver/sentInquiries/${userName}`)
      .then((res) => {
        console.log('updating sentInquiries: ', res.data)
        dispatch(setSentInquiries(res.data.sentInquiries));
      })
      .catch((err) => {
        console.log('update sentInquiries failed in Inquiries.js:');
        console.log(err);
      })
  };

  const getRecievedInquiries = () => {
    axios.get(`/api/inquiryserver/recievedInquiries/${userName}`)
      .then((res) => {
        console.log('updating recievedInquiries: ', res.data)
        dispatch(setRecievedInquiries(res.data.recievedInquiries));
      })
      .catch((err) => {
        console.log('update recievedInquiries failed in Inquiries.js:');
        console.log(err);
      })
  };

  React.useEffect(getInquiries, []);
  React.useEffect(getSentInquiries, []);
  React.useEffect(getRecievedInquiries, []);

  return (
    <div className="inquiries">
      <h2 style={{ margin: "25px", }}>My Sent Inquiries :</h2>
      <InquiriesSentCard inquiry={placeholderInquiry1} />
      {sentInquiries.map((x, i) => (
        <InquiriesSentCard inquiry={x} id={`sendInquiryCard#${i}`}/>
      ))}

      <h2 style={{ margin: "25px", }}>My Recieved Inquiries :</h2>
      <InquiriesRecievedCard inquiry={placeholderInquiry2} />
      {recievedInquiries.map((x, i) => (
        <InquiriesRecievedCard inquiry={x} id={`RecievedInquiry${i}`} />
      ))}
    </div>
  );
};


const mapStateToProps = state => ({
  inquiries: state.inquiryReducer.inquiries
});

export default connect(mapStateToProps)(Inquiries);