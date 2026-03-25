import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
    const dispatch = useDispatch();
    const router = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const reset = () => {
        setFormData({
            email: '',
            password: '',
        })  
    }
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(loginThunk(formData));
        router("/");
        reset();
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>

  )
}

export default LoginPage