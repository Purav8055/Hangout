import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer'
import { allUsersRoute, host } from '../utils/APIRoutes';
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();
  useEffect(() => {
    const initialize = ()=>{
      if (!localStorage.getItem("currentUser")) {
        navigate("/login");
      } else {
        setCurrentUser(
          JSON.parse(
            localStorage.getItem("currentUser")
          )
        );
      }
    }
    initialize();
}, [])
  useEffect(() => {
    if(currentUser)
    {
      const fillContacts = async ()=>{
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
      fillContacts();
    }
  }, [currentUser])
  
  useEffect(() => {
    if(currentUser)
    {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} setContacts={setContacts} setCurrentChat={setCurrentChat}/>
        {
          currentChat===undefined ? <Welcome contacts={contacts}/> : <ChatContainer currentChat={currentChat} socket={socket}/>
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 100vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    /* Tablet */
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    /* Mobile */
    @media screen and (max-width: 719px) {
      grid-template-columns: 1fr;  
      height: 95vh;  
      width: 95vw;  
      overflow-y: auto;  
    }
  }

  @media screen and (max-width: 719px) {
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

export default Chat
