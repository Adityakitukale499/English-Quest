import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import axios from 'axios'

const AddUser = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({});
    const [roles, setRoles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/roles', config).then(data => {
            console.log(data);
            setRoles(data.data);
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    }

    const createUser = async () => {

        console.log(values);
        await axios.post('http://localhost:8000/auth/add-user', { ...values }, config).then(data => {
            console.log(data);
            alert('user created successfully')
            navigate('/booklist')
        }).catch((e) => {
            console.log(e);
            alert(e.response.data.message)
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
        if (!values.role) {
            alert("Role is required");
            return
        }
        createUser()
        console.log(values);
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
                        <h1>Add User</h1>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        autoComplete="off"
                                        className={`input`}
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name || ""}
                                        required
                                    />
                                </div>
                            </div>
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
                            <div className="field">
                                <label className="label">Role</label>
                                <div className="control">
                                    <select name="role"
                                        onChange={handleChange} value={values.role || ""}>

                                        <option value="">Select</option>
                                        {roles.map((e) => (

                                            <option value={e._id}>{e.type}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <button
                                type="submit"
                                className="button"
                            >
                                Add User
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddUser