import React, { useState, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({handleSendMessage, currentChat}) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    setShowEmojiPicker(false);
  }, [currentChat])
  

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (e)=>{
    e.preventDefault();
    if(msg.length > 0)
    {
      handleSendMessage(msg);
      setMsg("");
      setShowEmojiPicker(false);
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <EmojiPicker 
                onEmojiClick={handleEmojiClick}
                theme="dark"
                searchDisabled={false}
                skinTonesDisabled
                width={300}
                height={400}
                emojiStyle="native"
                lazyLoadEmojis={true}
                previewConfig={{
                  showPreview: false
                }}
                style={{
                  '--epr-bg-color': '#080420',
                  '--epr-category-label-bg-color': '#080420',
                  '--epr-hover-bg-color': '#ffffff20',
                  '--epr-focus-bg-color': '#ffffff20',
                  '--epr-search-border-color': '#9a86f3',
                  '--epr-search-input-bg-color': '#080420',
                  '--epr-search-input-text-color': '#fff',
                  '--epr-highlight-color': '#9a86f3',
                  '--epr-scrollbar-thumb-color': '#9a86f3',
                  '--epr-scrollbar-track-color': '#080420',
                  '--epr-text-color': '#fff',
                  '--epr-scrollbar-width': '5px',
                  '--epr-scrollbar-track-width': '5px',
                  '--epr-scrollbar-thumb-width': '5px',
                  '--epr-scrollbar-thumb-radius': '3px',
                  '--epr-scrollbar-track-radius': '3px'
                }}
              />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>{sendChat(e)}}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;

  .emoji-picker-wrapper {
    position: absolute;
    top: -450px;
    box-shadow: 0 5px 10px #9a86f3;
    & ::-webkit-scrollbar {
      width: 5px;
      &-thumb {
        background-color: #9a86f3;
        border-radius: 3px;
      }
      &-track {
        background-color: #080420;
        border-radius: 3px;
      }
    }

    @media screen and (max-width: 719px) {
      top: -350px;
      right: 0;
      width: 280px;
    }
  }

  @media screen and (max-width: 719px) {
    grid-template-columns: 15% 85%;
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
        
        @media screen and (max-width: 719px) {
          font-size: 1.2rem;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    @media screen and (max-width: 719px) {
      gap: 0.5rem;
    }

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      @media screen and (max-width: 719px) {
        font-size: 1rem;
        padding-left: 0.5rem;
        width: 85%;
      }

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      @media screen and (max-width: 719px) {
        padding: 0.3rem 0.8rem;
        svg {
          font-size: 1.2rem;
        }
      }
      
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;