import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setUserName, setIsLoggedIn, setAdmin } from '../redux/actions/userActions';
const SignUp = () => {

    const [localUsername, setLocalUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [localAdmin, setLocalAdmin] = React.useState(false);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const dispatch = useDispatch();

    const signupAuth = () => {

        axios.post('/api/loginserver/signup', {
            username: localUsername,
            password: password,
            admin: localAdmin
        })
        .then((res) => {
            console.log(res.data);
    
            if(res.data.userId !== null){
                console.log("User registered.");
                dispatch(setUserName(localUsername,res.data.userId));
                dispatch(setIsLoggedIn(true));
                dispatch(setAdmin(res.data.admin));

            }
            else {
                console.log(res.data.error);
            }
        })
    };

    console.log('Here is admin: '+ localAdmin);
    console.log('here is isLoggedin: '+ isLoggedIn);
    return (
        <div>
            {isLoggedIn === true ? <Redirect to="/home"/> : null }
            <h1>Signup</h1>
            <div id="SignupBox">
                <div id="username">
                    <input value={localUsername}
                        onChange={e => setLocalUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div id="password">
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div id="admincheckbox">
                    <input type="checkbox" id="admin" name="admin" value={localAdmin} onChange={e => setLocalAdmin(!localAdmin)} checked = {localAdmin} />
                    <label htmlFor="admin"> Become an Admin? </label>
                </div>

                <div>
                    <button name="button" disabled={!localUsername || !password}
                        onClick={signupAuth}>Register</button>
                </div>
                <div>
                    <a href="/home">Go Back Home</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
