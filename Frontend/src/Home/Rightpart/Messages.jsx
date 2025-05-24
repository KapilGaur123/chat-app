import React, { useEffect, useRef } from "react";
import Message from "./Message";
import GetMessages from "../../context/GetMessages.jsx";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

function Messages() {
  const { loading, messages } = GetMessages();
  useGetSocketMessage();
  
  const lastMsg = useRef();
  useEffect(()=>{
    setTimeout(()=> {
      if(lastMsg.current){
        lastMsg.current.scrollIntoView({
          behavior: "smooth",
        })
      }
    },100)
  },[messages])

  return (
    <>
      <div
        className="scroll-container"
        style={{ minHeight: "calc(86vh - 8vh)" }}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMsg}>
              <Message message={message} />
            </div>
          ))
        )}
        {!loading && messages && messages.length === 0 && (
          <div>
            <p className="text-center mt-[20%]">Say hi, to start chat</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
