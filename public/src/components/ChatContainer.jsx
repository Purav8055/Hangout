import React from 'react'
import styled from 'styled-components'
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
        to: currentChat.id,
      });
      setMessages(response.data);
    }
    getMessages();
  }, [currentChat])

  useEffect(() => {
    if(socket.current)
    {
      socket.current.on("receive-msg", (data)=>{
        if(currentChat && data.from===currentChat.id)
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
      to: currentChat.id,
      message: msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat.id,
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
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
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
      <div className="chat-input-container">
        <ChatInput handleSendMessage={handleSendMessage} currentChat={currentChat} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack elements vertically */
  height: 100vh;
  overflow: hidden;
  background-color: #080420;

  /* More aggressive adjustment: reduce the subtracted value */
  grid-template-rows: 70px calc(100vh - (70px + 120px + 35px)) 120px; /* Increased padding adjustment to 30px */

  @media screen and (max-width: 719px) {
    grid-template-rows: 60px calc(100vh - (60px + 100px + 25px)) 100px; /* Increased padding adjustment for smaller screens */
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 80px calc(100vh - (80px + 110px + 28px)) 110px; /* Increased padding adjustment for medium screens */
  }

  .chat-header {
    height: 70px;
    min-height: 70px;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #9a86f3;

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
    flex-grow: 1; /* Allow messages to take up available space */
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 2rem;
    gap: 1rem;
    overflow-y: auto;
    padding: 1rem 2rem;

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
  .chat-input-container { /* New container for ChatInput */
    height: 120px; /* Fixed height for input area */
    /* Add any necessary padding or margin here */
    @media screen and (max-width: 719px) {
      height: 100px;
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      height: 110px;
    }
  }
`;


export default ChatContainer
