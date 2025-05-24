import React, { useEffect, useState } from "react";
import UseConversation from "../../zustand/UseConversation";
import { useSocketContext } from "../../context/SocketContext";

function ChatUser() {
  const [name, setName] = useState('');
  const {selectConversation} = UseConversation();  
  const {onlineUsers} = useSocketContext()

  // console.log(selectConversation);
  
  const getOnlineStatus = (userId) => {
    return onlineUsers.includes(userId)? "Online": "Offline"
  }

  useEffect(() => {
    const showName = () => {
      if(selectConversation === null){
        setName(". . . . . . ")
      }else{
        setName(selectConversation.fullname)
      }
    }
    showName();
  }, [selectConversation]);
  
  return (
    <>
      <div className="flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[12vh]">
        <div className={`avatar ""`}>
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{name}</h1>
          <span className="text-sm">{getOnlineStatus(selectConversation?._id)}</span>
        </div>
      </div>
    </>
  );
}

export default ChatUser;
