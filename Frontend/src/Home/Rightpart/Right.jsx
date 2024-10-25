import React from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import TypeSend from "./TypeSend";

function Right() {
  return (
    <div className="w-[70%] text-gray-400 bg-slate-900">
      <ChatUser />
      <div
        className="scroll-container"
        style={{ maxHeight: "calc(86vh - 8vh)" }}
      >
        <Messages />
      </div>
      <TypeSend />
    </div>
  );
}

export default Right;
