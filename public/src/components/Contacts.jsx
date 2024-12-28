import React from 'react'
import { useState, useEffect } from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import Logout from '../components/Logout'
import FriendButton from './FriendButton';
import Input from './Input';
import axios from "axios";
import { getPendingRoute, declineRoute, acceptRoute } from '../utils/APIRoutes';
import { FaCheckCircle } from "react-icons/fa";
import {  FaCircleXmark } from "react-icons/fa6";

const Contacts = ({contacts, setContacts, setCurrentChat}) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [showInput, setShowInput] = useState(false);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const initialize = async ()=>{
      const data = await JSON.parse(
        localStorage.getItem("currentUser")
      );
      setCurrentUserName(data?.username);
      setCurrentUserImage(data.avatarImage);
    }
    initialize();
  }, []);
  useEffect(() => {
    const get = async ()=>{
      const id = JSON.parse(
        localStorage.getItem("currentUser")
      )._id;
      const data = await axios.get(`${getPendingRoute}/${id}`);
      setPending(data.data.pending);
    }
    get();
  }, [])
  
  const changeCurrentChat = (index, value)=>{
    if(currentSelected!==index)
    {
      setCurrentSelected(index);
      setCurrentChat(value);
    }
    else{
      setCurrentSelected(undefined);
      setCurrentChat(undefined);
    }
  }

  return (
    <Container>
      <div className="brand">
        <div className="left">
          <img src={Logo} alt="logo" />
          <h3>Hangout</h3>
        </div>
        <Logout />
      </div>
  
      <div className="contacts">
        {contacts.length > 0 && contacts.map((value, index) => (
          <div
            key={value.id}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => changeCurrentChat(index, value)}
          >
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${value.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{value?.username}</h3>
            </div>
          </div>
        ))}
        {
          pending.length > 0 && pending.map((value, index) => (
            <div key={value.name} className="pending-request">
              <div className="left">
                <div className="requestAvatar">
                  <img
                    src={`data:image/svg+xml;base64,${value.pic}`}
                    alt="pic"
                  />
                </div>
                <div className="requestUsername">
                  <h3>{value.name}</h3>
                </div>
              </div>
              <div className="right">
                <FaCheckCircle className="accept-icon" onClick={async ()=>{
                  const user = JSON.parse(
                    localStorage.getItem("currentUser")
                  );
                  const data = await axios.post(acceptRoute, {
                    from: user._id,
                    fromUsername: user?.username,
                    fromPic: user.avatarImage,
                    to: value.name,
                    toPic: value.pic,
                    toId: value.id,
                  });
                  setContacts(data.data.friendsList);
                  setPending(data.data.pendingList);
                }}/>
                <FaCircleXmark className="decline-icon" onClick={async ()=>{
                  const id = JSON.parse(
                    localStorage.getItem("currentUser")
                  )._id;
                  const data = await axios.post(declineRoute, {
                    from: id,
                    to: value.name,
                  });
                  setPending(data.data.pendingList);
                }}/>
              </div>
            </div>
          ))
        }

        {
          showInput ? <Input setShowInput={setShowInput}/> : <FriendButton setShowInput={setShowInput}/>
        }
      </div>
  
      <div className="current-user">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
  
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 2px solid #9a86f3;

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow-y: auto;
    padding: 1rem;

    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffffff39;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar img {
        height: 3rem;
      }

      .username h3 {
        color: white;
      }
    }

    .selected {
      background-color: #9a86f3;
    }

    .friend {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
    }

    .add-friend-button {
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
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    position: sticky;
    bottom: 0;
    width: 100%;

    .avatar img {
      height: 4rem;
      border-radius: 50%;
    }

    .username h2 {
      color: white;
      font-size: 1.2rem;
      text-transform: capitalize;
    }
  }
  .pending-request {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff34;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  width: 100%;
}

.pending-request:hover {
  background-color: #9a86f3;
}

.left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.requestAvatar img {
  height: 3rem;
  border-radius: 50%;
}

.requestUsername h3 {
  color: white;
  font-size: 1.5rem;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.accept-icon,
.decline-icon {
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.accept-icon:hover {
  color: #4caf50;
}

.decline-icon:hover {
  color: #f44336;
}
`;




export default Contacts
