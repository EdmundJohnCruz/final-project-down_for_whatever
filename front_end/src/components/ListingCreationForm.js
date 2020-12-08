import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input-field'
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
const axios = require('axios');

const url = "http://locahost:4001";

class ListingCreationForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            userid: 'placeholder',
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
        }
        console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(data)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
        axios.post(url + "/listings", { listing: data })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="ListingCreationForm">

                <Form onSubmit={this.handleSubmit}>
                    <h1>Create a New Listing</h1>
                    <Form.Group>
                        <Form.Label class="font-weight-bold " >Title</Form.Label>
                        <Form.Control id="title" type="title" placeholder="Enter the Title of the Listing" required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label class="font-weight-bold">Description</Form.Label>
                        <Form.Control id="description" type="description" as="textarea" rows={4} placeholder="Enter a Description : &#13;&#10; Hello" required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label class="font-weight-bold">Price</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="price" type="number" placeholder="0.00" min="0" step=".01" pattern="^\d+(?:\.\d{1,2})?$" required />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label class="font-weight-bold">Please Provide an Image for the Listing</Form.Label>
                        <Form.File type="image" label="Upload your image here" custom />
                    </Form.Group>
                    
                    <button type="submit" class="btn btn-primary" >Create Listing</button>
                </Form>
            </div>
        )
    }
}

/*

                <form onSubmit={this.handleSubmit}>
                    <h1>Create a New Listing</h1>
                    <input placeholder="Title" value={this.state.title} onChange={this.onTitleChange} required />
                    <textarea placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange} required/>
                    <CurrencyInput placeholder="$0.00" allowDecimals={true} prefix={'$'} precision={2} allowNegativeValue={false} onChange={(value) => this.onPriceChange(value)} required/>
                    <button type="submit">Create Listing</button>
                </form>
*/

export default ListingCreationForm;