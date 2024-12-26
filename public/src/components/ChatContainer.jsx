import React from 'react'
import styled from 'styled-components'
import Logout from '../components/Logout'
import { v4 as uuidv4 } from "uuid";
import ChatInput from './ChatInput';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import {sendMessageRoute, getMessageRoute} from "../utils/APIRoutes"

const ChatContainer = ({currentChat, socket}) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    const getMessages = async ()=>{
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const response = await axios.post(getMessageRoute, {
        from: user._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    getMessages();
  }, [currentChat])

  useEffect(() => {
    if(socket.current)
    {
      socket.current.on("receive-msg", (data)=>{
        if(data.from===currentChat._id)
        {
          setMessages((prev) => [...prev, {
            fromSelf: false,
            message: data.msg,
          }])
        }
      })
    }

    return () => {
      if(socket.current) {
        socket.current.off("receive-msg");
      }
    }
  }, [currentChat])
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages])
  
  
  const handleSendMessage = async (msg)=>{
    const data = JSON.parse(localStorage.getItem("currentUser"));
    socket.current.emit("send-msg", {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    const temp = [...messages];
    temp.push({
      fromSelf: true,
      message: msg,
    })
    setMessages(temp);
  }
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div key={uuidv4()} className={`message ${message.fromSelf ? "sended" : "recieved"}`} ref={scrollRef}>
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage = {handleSendMessage} currentChat={currentChat}/>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  max-height: 100vh;  

  @media screen and (max-width: 719px) {
    display: flex;     
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    @media screen and (max-width: 719px) {
      padding: 0.5rem 1rem;
      min-height: 60px;  
      flex-shrink: 0;      
    }

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media screen and (max-width: 719px) {
        gap: 0.5rem;
      }

      .avatar {
        img {
          height: 3rem;

          @media screen and (max-width: 719px) {
            height: 2.5rem;
          }
        }
      }
      .username {
        h3 {
          color: white;

          @media screen and (max-width: 719px) {
            font-size: 1rem;
          }
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    @media screen and (max-width: 719px) {
      padding: 0.5rem 1rem;
      gap: 0.5rem;
      flex: 1;          
      overflow-y: auto;
    }

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;

        @media screen and (max-width: 719px) {
          max-width: 85%;
          padding: 0.75rem;
          font-size: 0.9rem;
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;


export default ChatContainer
