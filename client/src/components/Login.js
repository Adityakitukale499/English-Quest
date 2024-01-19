import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({});
    const userLogin = async () => {
        await axios.post('http://localhost:8000/auth/login', { ...values }).then(data => {
            localStorage.setItem( 'jwt' ,data.data.token);
            localStorage.setItem( 'role' ,data.data.role);
            navigate('/booklist')
        }).catch((e) => {
            console.log(e);
            alert('faield to sign up')
        })
    }

    const handleSubmit = event => {
        if (event) event.preventDefault();
        if (!values.email) {
           alert("Email address is required");
           return
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            alert("Email address is invalid");
            return
        }
        if (!values.password) {
            alert("Password is required");
            return
        }
        userLogin()
        // console.log(values);
    };
    const handleChange = event => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };
    return (



        <div className="section ">
            <div className="container">
                <div className="column is-6 is-offset-3">
                    <div className="box">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="field">
                                <label className="label">Email Address</label>
                                <div className="control">
                                    <input
                                        autoComplete="off"
                                        className={`input`}
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email || ""}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        className={`input`}
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password || ""}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="button"
                            >
                                Login
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login