import React, {Component} from 'react';
import CurrencyInput from 'react-currency-input-field'
const axios = require('axios');

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

    onPriceChange = e => {
        this.setState({
            price: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
        }
        console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(data)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
        axios.post("/listings", {listing: data})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
//  <input pattern="\d+((\.)\d+)" placeholder="$0.00 (Price)" value={this.state.price} onChange={this.onPriceChange} required />
//  can't get this working for now, use one or the other
//  <CurrencyInput placeholder="$0.00" allowDecimals={true} prefix={'$'} precision={2} allowNegativeValue={false} onChangeEvent={(value) => console.log(`price : ${value}`)} required/>
    render() {
        return (
            <div className="ListingCreationForm">
                <form onSubmit={this.handleSubmit}>
                    <h1>Create a New Listing</h1>
                    <input placeholder="Title" value={this.state.title} onChange={this.onTitleChange} required />
                    <textarea placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange} required/>
                    <input placeholder="$0.00 (Price)" value={this.state.price} onChange={this.onPriceChange} required />
                    <button type="submit">Create Listing</button>
                </form>
            </div>
        )
    }
}

export default ListingCreationForm;