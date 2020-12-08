import React from 'react';
import {connect} from 'react-redux';

const GetListing = ({listing}) => {
    return (
        <div>
          <table className="listing">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Price</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{listing.description}</td>
                <td>{listing.type}</td>
                <td>{listing.price}</td>
                <td>{listing.title}</td>
              </tr>
            </tbody>
           </table>
          </div>
    );  
}

const mapStateToProps = state => ({
    dispatch: state.dispatch
  });
  
export default connect(mapStateToProps)(GetListing);