import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import ListAssignments from './ListAssignments';

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    };

    const handleLogin = () => {
        fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((response) => {
                const jwtToken = response.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
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
                            <label htmlFor="username">Username</label>
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
