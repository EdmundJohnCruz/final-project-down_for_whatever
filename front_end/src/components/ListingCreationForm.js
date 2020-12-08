import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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

    onPriceChange = e => {
        this.setState({
            price: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            userid: 'placeholder',
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
        }
        console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(data)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
        axios.post(url+"/listings", {listing: data})
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
                        <Form.Control id="title" type="title" placeholder="Enter the Title of the Listing" value={this.state.title} onChange={this.onTitleChange} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label class="font-weight-bold">Description</Form.Label>
                        <Form.Control id="description" type="description" as="textarea" rows={4} placeholder="Enter a Description : &#13;&#10; Hello" value={this.state.description} onChange={this.onDescriptionChange} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label class="font-weight-bold">Price</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="price" type="number" placeholder="0.00" min="0" step=".01" pattern="^\d+(?:\.\d{1,2})?$" value={this.state.price} onChange={this.onPriceChange} required />
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

export default ListingCreationForm;