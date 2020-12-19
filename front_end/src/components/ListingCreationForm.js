import React from 'react';
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
    const [file, setFile] = React.useState();
    const userName = useSelector(state => state.userReducer.userName);
    const userId = useSelector(state => state.userReducer.userId);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userid',userId,);
        formData.append('username',userName,);
        formData.append('title',title,);
        formData.append('description',description,);
        formData.append('price',price,);
        formData.append('image',file,file.name);
        axios.post(url, formData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
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
                    {/*<Form.File type="image" label="Upload your image here" custom />*/}
                    <br/>
                    <input type="file" onChange={e => setFile(e.target.files[0])} required />
                </Form.Group>

                <button type="submit" class="btn btn-primary float-right">Create Listing</button>

                <button onClick={() => {dispatch(setShowLCF(false)) }}>Cancel</button>
            </Form>
        </div>
    )
}

export default ListingCreationForm;