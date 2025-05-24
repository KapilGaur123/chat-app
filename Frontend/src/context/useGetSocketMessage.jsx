import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import UseConversation from "../zustand/UseConversation";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = UseConversation();

  useEffect(() => {
    if(!socket) return; // return when socket is null

    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play()
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useGetSocketMessage;
