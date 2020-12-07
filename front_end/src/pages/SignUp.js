/*
import React from 'react';

const signupAuth = () => {
    const body = {
        username: username,
        password: password,
    };

    axios.post('/api/signup', body)
    .then((res) => {
        console.log(res.data);

        if(res.data.success){
            console.log("User signed in.");
        }
        else {
            setError(res.data.error);
        }
    })
    .catch(() => {
        setError("An error occured while registering.");
    });
};

const SignUp = () => {
    return (
        <div>
            <h1>Signup</h1>
            
            <div id="SignupBox">
                <div id="username">
                    <input value={username}
                        onChange={e => setUsername(e.target.value)}
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

                <div>
                    <button name="button" disabled={!username || !password}
                        onClick={signupAuth}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
*/