import React from "react";
import Message from "./Message";
import GetMessages from "../../context/GetMessages.jsx";
import Loading from "../../components/Loading.jsx";
import UseConversation from "../../zustand/UseConversation.jsx";

function Messages() {
  const { loading, messages } = GetMessages();
  const {selectConversation} = UseConversation();
  

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
            <Message key={message._id} message={message} />
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
