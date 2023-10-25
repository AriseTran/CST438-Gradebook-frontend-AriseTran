import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import ListAssignments from './ListAssignments';

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    };

    const isInstructor = (email) => {
        return email.includes("dwisneski");
    };

    const login = () => {
        fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((response) => {
                const userEmail = user.username;
                if (isInstructor(userEmail)) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                } else {
                    console.log("User is not an instructor.");
                }
            })
            .catch(err => console.log(err));
    };
    if (isAuthenticated) {
        return <ListAssignments/>
    }else{
        return (
            <div className="App">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label htmlFor="username">Email</label>
                        </td>
                        <td>
                            <input type="text" name="username" value={user.username} onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password">Password</label>
                        </td>
                        <td>
                            <input type="password" name="password" value={user.password} onChange={onChange} />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <br />
                <button id="submit" onClick={login}>
                    Login
                </button>
            </div>
        );
    }
}

export default Login;
