import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn } from '../redux/actions/userActions';


const Login = () => {
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState(); //state based on user's inputted password
    const [error, setError] = React.useState();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        /*axios.post('/api/login', { //grabbing username and password from DB
            username: '',
            password: '',
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    console.log("User successfully logged in.");
                    dispatch(setUserName(username));
                    dispatch(setIsLoggedIn(true));
                }
                else {
                    setError(res.data.error);
                }
            })
            .catch(() => {
                setError("An error occured while attempting to login.");
            });*/

        dispatch(setUserName(username));
        dispatch(setIsLoggedIn(true));
    };

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit} className="text-center" style={{ padding: "10px" }} >
                <Form.Group>
                    <Form.Label class="font-weight-bold">Username :</Form.Label>
                    <Form.Control id="username" type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label class="font-weight-bold">Password :</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" className="btn-primary float-center">Log In</Button>
            </Form>
        </div>
    )
}

export default Login;