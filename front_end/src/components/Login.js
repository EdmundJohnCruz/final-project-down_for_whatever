import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setIsLoggedIn } from '../redux/actions/userActions';
import bcrypt from 'bcrypt';


const Login = () => {
    const [userId, setUserId] = React.useState();
    const [typedPassword, setTypedPassword] = React.useState(); //state based on user's inputted password
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        /*axios.post('/api/login',{ //grabbing userId and password from DB
            userId: '',
            password: '',
        })
         .then((res) => {
             console.log(res.data);
             if(res.data.success){
                bcrypt.compare(typedPassword, password, function(err,res) { //comparing inputted password with hashed password in DB(?)
                    if (res == true){
                        console.log("Passwords match. User can login.");
                        dispatch(setUserName(userId));
                        dispatch(setIsLoggedIn(true));
                    }
                    else{
                        console.log(err);
                    }
                 });
                console.log("User logged in!");
            }
         });*/

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
                    <Form.Control id="username" type="username" placeholder="Password" required onChange={(e) =>setTypedPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" className="btn-primary float-center">Log In</Button>
            </Form>
        </div>
    )
}

export default Login;