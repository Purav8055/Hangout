import React from 'react'

const FriendButton = ({setShowInput}) => {
  return (
    <div className="friend">
        <button className="add-friend-button" onClick={()=>{
            setShowInput(true);
        }}>
            <span>+</span> Add a Friend
        </button>
    </div>
  )
}

export default FriendButton
