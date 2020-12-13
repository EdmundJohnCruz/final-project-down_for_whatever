import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setInquiry } from '../redux/actions/inquiryActions';
import { connect } from 'react-redux';

const Inquiries = ({inquiries}) => {
  
  return (
    <div className="inquiries">
      { inquiries.map( (x, i) => {
        return (
          <div className="inquiry" key={i.toString()}>
            {x.message}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  inquiries: state.inquiryReducer.inquiries
});

export default connect(mapStateToProps)(Inquiries);