import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import mongoose from "mongoose"
import { json } from "express";

export const sendMessage = async (req, res) => {
  try {
    let { message } = req.body;
    let { id: receiverId } = req.params;
    let senderId = req.user._id;

    if(!message || !receiverId){
    return res.status(400).json({error: "message and receiverId is not received"})
    }

    let conversation_user = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation_user) {
      conversation_user = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    })

    conversation_user.messages.push(newMessage._id);
    //save both paraller
    // await Promise.all([conversation_user.save(), newMessage.save()]);
    await conversation_user.save();

    res.status(200).json(newMessage)

  } catch (error) {
    console.log("sendMessage error : ", error);
    res.status(500).json({ error: "internal server error { sendMessage }" });
  }
};

export const getMessage = async (req, res) => {
  try {
    let {id: chatUser} = req.params;
    let senderId = req.user._id;

    console.log(req.params.chatUser);
    console.log(senderId);
        

    if(!chatUser || !senderId){
      return res.status(502).json({error:"Invaid request data"})
    }

    const conversation_user = await Conversation.findOne({
        members: {$all: [senderId, chatUser]}
    }).populate("messages");


    if(!conversation_user){
      return res.status(500).json({data : null})
    }

    if(conversation_user.messages.length === 0){
      return res.status(200).json({message: "No message found"})
    }

    const message = conversation_user.messages;
    return res.status(201).json(message)

  } catch (error) {
    console.log("getMessage error : ", error);
    res.status(500).json({ error: "internal server error { getMessage }" });
  }
};
