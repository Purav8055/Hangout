import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const data = [];
    const fetchAvatar = async ()=>{
        for(let i = 0; i < 4; i++)
        {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setisLoading(false);
    }
    fetchAvatar();
  }, [])

  const setProfilePicture = async ()=>{
    if(selectedAvatar===undefined)
    {
        toast.error("Please select a profile pic", toastOptions);
    }
    else{
        const user = await JSON.parse(localStorage.getItem("currentUser"));
        const axiosRes = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar]
        });
        console.log(axiosRes.data.isSet);
        if(axiosRes.data.isSet)
        {
            user.isAvatarImageSet = axiosRes.data.isSet;
            user.avatarImage = axiosRes.data.image;
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/");
        }
        else {
            toast.error("Error setting avatar. Please try again.", toastOptions);
        }
    }
  }
  
  
  return (
    <>
        {isLoading ? (
            <Container>
                <img src={loader} alt="loading" className="loader" />
            </Container>
        ) : (
            <Container>
                <div className="title-container">
                    <h1>Pick an Avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((value, index, array)=>{
                        return(
                    <div
                        className={`avatar ${
                            selectedAvatar === index ? "selected" : ""
                        }`}
                        key={index}
                    >
                    <img
                        src={`data:image/svg+xml;base64,${value}`}
                        alt="avatar"
                        onClick={() => setSelectedAvatar(index)}
                    />
                    </div>
                        )
                    })}
                </div>
                <button onClick={setProfilePicture} className="submit-btn">
                    Set as Profile Picture
                </button>
                <ToastContainer />
            </Container>
        )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  padding: 1rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      text-align: center;
      font-size: 2rem;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 1rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
    .avatar:hover {
      border: 0.4rem solid rgba(78, 14, 255, 0.23);
    }
    .avatar.selected:hover {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    width: auto;
    min-width: 200px;
    &:hover {
      background-color: #4e0eff;
    }
  }

  @media screen and (max-width: 768px) {
    gap: 2rem;

    .title-container h1 {
      font-size: 1.75rem;
    }

    .avatars {
      gap: 1.5rem;
      
      .avatar img {
        height: 5rem;
      }
    }

    .submit-btn {
      padding: 0.875rem 1.75rem;
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 480px) {
    gap: 1.5rem;

    .title-container h1 {
      font-size: 1.5rem;
    }

    .avatars {
      gap: 1rem;
      
      .avatar {
        padding: 0.3rem;
        border-width: 0.3rem;
        
        img {
          height: 4rem;
        }
      }
    }

    .submit-btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.8rem;
      min-width: 160px;
    }
  }
`;

export default SetAvatar
