import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn } from '../redux/actions/userActions';


const Login = () => {
    const [userId, setUserId] = React.useState();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setUserName(userId));
        dispatch(setIsLoggedIn(true));
    };

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit} className="text-center" style={{ padding: "10px" }} >
                <Form.Group>
                    <Form.Label class="font-weight-bold">Username :</Form.Label>
                    <Form.Control id="username" type="username" placeholder="Username" onChange={(e) => setUserId(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Password :</Form.Label>
                    <Form.Control id="username" type="username" placeholder="Password" required />
                </Form.Group>
                <Button type="submit" className="btn-primary float-center">Log In</Button>
            </Form>
        </div>
    )
}

export default Login;