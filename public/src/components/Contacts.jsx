import React from 'react'
import { useState, useEffect } from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg"

const Contacts = ({contacts, setCurrentChat}) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  useEffect(() => {
    const initialize = async ()=>{
      const data = await JSON.parse(
        localStorage.getItem("currentUser")
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    initialize();
  }, []);
  const changeCurrentChat = (index, value)=>{
    setCurrentSelected(index);
    setCurrentChat(value);
  }
  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>Hangout</h3>
      </div>
      <div className='contacts'>
        {
          contacts.map((value, index)=>{
            return(
              <div key={value._id} className={`contact ${index===currentSelected ? "selected" : ""} `} onClick={()=>{changeCurrentChat(index, value)}}>
                <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${value.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{value.username}</h3>
                  </div>
              </div>
            )
          })
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
  )
}

const Container = styled.div`
 display: grid;
 grid-template-rows: 10% 75% 15%;
 overflow: hidden;
 background-color: #080420;

 @media screen and (max-width: 719px) {
   grid-template-rows: 12% 73% 15%;
   height: 100vh;
 }

 .brand {
   display: flex;
   align-items: center;
   gap: 1rem;
   justify-content: center;

   /* Mobile brand adjustments */
   @media screen and (max-width: 719px) {
     gap: 0.5rem;
     padding: 0.5rem;
   }

   img {
     height: 2rem;
     @media screen and (max-width: 719px) {
       height: 1.5rem;
     }
   }
   h3 {
     color: white;
     text-transform: uppercase;
     @media screen and (max-width: 719px) {
       font-size: 1rem;
     }
   }
 }

 .contacts {
   display: flex;
   flex-direction: column;
   align-items: center;
   overflow: auto;
   gap: 0.8rem;

   @media screen and (max-width: 719px) {
     gap: 0.5rem;
     padding: 0.5rem 0;
   }

   &::-webkit-scrollbar {
     width: 0.2rem;
     &-thumb {
       background-color: #ffffff39;
       width: 0.1rem;
       border-radius: 1rem;
     }
   }

   .contact {
     background-color: #ffffff34;
     min-height: 5rem;
     cursor: pointer;
     width: 90%;
     border-radius: 0.2rem;
     padding: 0.4rem;
     display: flex;
     gap: 1rem;
     align-items: center;
     transition: 0.5s ease-in-out;

     @media screen and (max-width: 719px) {
       min-height: 4rem;
       width: 95%;
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
           font-size: 0.9rem;
         }
       }
     }
   }
   .selected {
     background-color: #9a86f3;
   }
 }

 .current-user {
   background-color: #0d0d30;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 2rem;

   @media screen and (max-width: 719px) {
     gap: 1rem;
     padding: 0.5rem;
   }

   .avatar {
     img {
       height: 4rem;
       max-inline-size: 100%;
       @media screen and (max-width: 719px) {
         height: 3rem;
       }
     }
   }
   .username {
     h2 {
       color: white;
       @media screen and (max-width: 719px) {
         font-size: 1rem;
       }
     }
   }

   @media screen and (min-width: 720px) and (max-width: 1080px) {
     gap: 0.5rem;
     .username {
       h2 {
         font-size: 1rem;
       }
     }
   }
 }
`;


export default Contacts
