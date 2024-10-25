import mongoose from "mongoose"
import Users from "./userModel.js"
import Message from "./messageModel.js"

const conversationSchema = new mongoose.Schema({

    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Users
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message,
            default: []
        }
    ]
}, { timestamps: true })

const Conversation = mongoose.model("conversation", conversationSchema)

export default Conversation;