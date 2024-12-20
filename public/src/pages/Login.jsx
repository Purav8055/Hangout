import React from 'react'
import styled from 'styled-components'
import axios from "axios";
import Logo from "../assets/logo.svg";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("currentUser"))
    {
      navigate("/");
    }
  
  }, []);
  
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error(
        "Username and Password is required.",
        toastOptions
      );
      return false;
    } else if (username==="") {
      toast.error(
        "Username and Password is required.",
        toastOptions
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation())
    {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true)
      {
        console.log(data);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/");
      }
    }
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>{handleSubmit(event)}}>
        <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Hangout</h1>
          </div>
          <input type="text" name="username" placeholder='Username' onChange={(e) => handleChange(e)} min="3"/>
          <input type="password" name="password" placeholder='Password' onChange={(e) => handleChange(e)}/>
          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login
