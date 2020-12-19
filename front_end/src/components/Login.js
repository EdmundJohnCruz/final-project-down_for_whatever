import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn, setAdmin } from '../redux/actions/userActions';


const Login = () => {
    const [localUsername, setLocalUsername] = React.useState();
    const [password, setPassword] = React.useState(); //state based on user's inputted password
    const [localAdmin, setLocalAdmin] = React.useState();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/loginserver/login', { //grabbing username and password from DB
            username: localUsername,
            password: password,
            admin: localAdmin,
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.error !== true) {
                    console.log("User successfully logged in. Username is "+ localUsername);
                    dispatch(setUserName(localUsername, res.data.userId));
                    dispatch(setIsLoggedIn(true));
                    if(localAdmin === true){
                        dispatch(setAdmin(localAdmin));
                    }
                }
                else {
                    console.log(res.data.message);
                    /*return ( //displaying error as alert(?)
                        <Modal size="lg" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                {res.data.message}
                                </Modal.Title>
                            </Modal.Header>
                        </Modal>
                    )*/
                }
            })
    };

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit} className="text-center" style={{ padding: "10px" }} >
                <Form.Group>
                    <Form.Label class="font-weight-bold">Username :</Form.Label>
                    <Form.Control id="username" type="username" placeholder="Username" onChange={(e) => setLocalUsername(e.target.value)} required />
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