import React, {useState} from 'react'
import styled from 'styled-components';
import axios from "axios";
import { sendRequestRoute } from '../utils/APIRoutes';

const data = JSON.parse(localStorage.getItem("currentUser"));

const Input = ({setShowInput}) => {
  const [friendUsername, setFriendUsername] = useState('');
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(friendUsername.length < 3)
    {
        alert("Enter a valid username");
    }
    else if(data.username===friendUsername)
    {
      alert("Can't send to self");
    }
    else{
        const data = JSON.parse(localStorage.getItem("currentUser"));
        const status = await axios.post(sendRequestRoute, {
            username: friendUsername,
            from: data.username,
            avatarImage: data.avatarImage,
            fromId: data._id,
        })
        setShowInput(false);
        alert(`${status.data.message}`);
    }
  }
  return (
    <Container>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your friend's username"
          name='username'
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button type="submit">
          Send Friend Request
        </button>
      </form>
    </div>
    </Container>
  )
}

const Container = styled.div`
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

input {
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #9a86f3;
  border-radius: 10px;
  background-color: #0d0d30;
  color: white;
  width: 100%;
  box-sizing: border-box;
  transition: 0.3s ease-in-out;
}

input:focus {
  border-color: #9a86f3;
  outline: none;
}

button {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #4f04ff21;
  color: white;
  border: 2px solid #9a86f3;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  span {
    font-size: 2rem;
    color: #ffffff;
  }

  &:hover {
    background-color: #9a86f3;
    color: #080420;
  }

  &:active {
    transform: scale(0.98);
  }
}


`

export default Input
