import React, {Component} from 'react';
import CurrencyInput from 'react-currency-input-field'
const axios = require('axios');

const url = "http://locahost:4001";

class ListingCreationForm extends Component {
    state = {
        title: "",
        description: "",
        price: "",
    };
    //  missing userid and images for now (should timestamp be handled in backend?)

    onTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    };

    onDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    };

    onPriceChange = (value) => {
        this.setState({
            price: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            userid: 'placeholder',
        }
        console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(data)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
        axios.post(url+"/listings", {listing: data})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <div className="ListingCreationForm">
                <form onSubmit={this.handleSubmit}>
                    <h1>Create a New Listing</h1>
                    <input placeholder="Title" value={this.state.title} onChange={this.onTitleChange} required />
                    <textarea placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange} required/>
                    <CurrencyInput placeholder="$0.00" allowDecimals={true} prefix={'$'} precision={2} allowNegativeValue={false} onChange={(value) => this.onPriceChange(value)} required/>
                    <button type="submit">Create Listing</button>
                </form>
            </div>
        )
    }
}

export default ListingCreationForm;