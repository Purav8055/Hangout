import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"

const Welcome = ({contacts}) => {
  const [username, setUsername] = useState(undefined);
  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("currentUser"))?.username)
  }, [])
  
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{username}!</span>
      </h1>
      {
        contacts.length === 0 ? <h3>Please add a friend to Start messaging.</h3> : <h3>Please select a chat to Start messaging.</h3>
      }
    </Container>
  )
}

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 color: white;
 flex-direction: column;
 
 img {
   height: 20rem;

   /* Mobile adjustments */
   @media screen and (max-width: 719px) {
     height: 12rem;
     margin: 1rem 0;
   }

   /* Tablet adjustments */  
   @media screen and (min-width: 720px) and (max-width: 1080px) {
     height: 16rem;
     margin: 1.5rem 0;
   }
 }

 span {
   color: #4e0eff;

   /* Mobile adjustments */
   @media screen and (max-width: 719px) {
     font-size: 2rem;
   }

   /* Tablet adjustments */
   @media screen and (min-width: 720px) and (max-width: 1080px) {
     font-size: 2rem; 
   }
 }

 /* Container padding adjustments */
 @media screen and (max-width: 719px) {
   padding: 1rem;
   text-align: center;
 }

 @media screen and (min-width: 720px) and (max-width: 1080px) {
   padding: 1.5rem;
 }
`;

export default Welcome
