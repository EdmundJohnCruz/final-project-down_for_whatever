import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setShowLCF } from '../redux/actions/modalActions';

const url = "/api/listingserver/listing";

const ListingCreationForm = () => {
    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();
    const [price, setPrice] = React.useState();

    const dispatch = useDispatch();
    const userName = useSelector(state => state.userReducer.userName);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            userid: userName,
            title: title,
            description: description,
            price: price,
        }
        axios.post(url, { listing: data })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        console.log(`\n\n~~~~~~~~~~~~~~~~~~~~\n\n Data : ${JSON.stringify(data)} \n\n~~~~~~~~~~~~~~~~~~~~\n\n`);
    };

    return (
        <div className="ListingCreationForm">
            <Form onSubmit={handleSubmit}>
                <h1>Create a New Listing</h1>
                <Form.Group>
                    <Form.Label class="font-weight-bold " >Title</Form.Label>
                    <Form.Control id="title" type="title" placeholder="Enter the Title of the Listing" onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Description</Form.Label>
                    <Form.Control id="description" type="description" as="textarea" rows={4} placeholder="Enter a Description : &#13;&#10; Hello" onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Price</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="price" type="number" placeholder="0.00" min="0" step=".01" pattern="^\d+(?:\.\d{1,2})?$" onChange={(e) => setPrice(e.target.value)} required />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Please Provide an Image for the Listing</Form.Label>
                    <Form.File type="image" label="Upload your image here" custom />
                </Form.Group>

                <button type="submit" class="btn btn-primary float-right">Create Listing</button>

                <button onClick={() => {dispatch(setShowLCF(false)) }}>Cancel</button>
            </Form>
        </div>
    )
}

export default ListingCreationForm;