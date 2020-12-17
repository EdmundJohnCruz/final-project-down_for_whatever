import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setInquiries } from '../redux/actions/inquiryActions';
import { connect } from 'react-redux';

const Inquiries = ({inquiries}) => {
  const dispatch = useDispatch(); 
  const inquiries1 = useSelector(state => state.inquiryReducer.inquiries);
  const getInquiries = () => {
    axios.get('/api/inquiryserver/inquiries')
    .then( (res) => {
      console.log('updating inquiries: ', res.data)
        dispatch(setInquiries(res.data.inquiry));
    })
    .catch( (err) => {
      console.log('update inquiries failed in Inquiries.js:');
      console.log(err);
    })
  };

  React.useEffect(getInquiries, []);

  return (
    <div className="inquiries">
      <h2>My Sent Inquiries :</h2>
      { inquiries.map( (x, i) => {
        return (
          <div className="inquiry" key={i.toString()}>
            {x.message}
          </div>
        );
      })}
      
      <h2>My Recieved Inquiries :</h2>

    </div>
  );
};

const mapStateToProps = state => ({
  inquiries: state.inquiryReducer.inquiries
});

export default connect(mapStateToProps)(Inquiries);