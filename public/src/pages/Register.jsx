import React from 'react'
import styled from 'styled-components'
import axios from "axios";
import Logo from "../assets/logo.svg";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("currentUser"))
    {
      navigate("/");
    }
  
  }, []);
  
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 2 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation())
    {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true)
      {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/setAvatar");
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
          <input type="text" name="username" placeholder='Username' onChange={(e) => handleChange(e)}/>
          <input type="email" name="email" placeholder='Email' onChange={(e) => handleChange(e)}/>
          <input type="password" name="password" placeholder='Password' onChange={(e) => handleChange(e)}/>
          <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={(e) => handleChange(e)}/>
          <button type='submit'>Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
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
  padding: 0 1rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      @media screen and (max-width: 480px) {
        height: 3.5rem;
      }
    }
    h1 {
      color: white;
      text-transform: uppercase;
      @media screen and (max-width: 480px) {
        font-size: 1.5rem;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    width: 100%;
    max-width: 500px;

    @media screen and (max-width: 480px) {
      padding: 2rem;
      gap: 1.5rem;
      border-radius: 1.5rem;
      width: 90%;
    }
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

    @media screen and (max-width: 480px) {
      padding: 0.8rem;
      font-size: 0.9rem;
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

    @media screen and (max-width: 480px) {
      padding: 0.8rem 1.5rem;
      font-size: 0.9rem;
    }
  }
  
  span {
    color: white;
    text-transform: uppercase;
    text-align: center;
    
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
    
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register
