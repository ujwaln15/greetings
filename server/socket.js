import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import Gathering from "./models/GatheringModel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const { userId, socketId } of userSocketMap.entries()) {
      if (socket.id === socketId) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName dp theme")
      .populate("recipient", "id email firstName lastName dp theme");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const sendGatheringMessage = async (message) => {
    const { gatheringId, sender, content, messageType, fileUrl } = message;
    const createdMessage = await Message.create({
      sender,
      recipient: null,
      content,
      messageType,
      timestamp: new Date(),
      fileUrl,
    });
    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName dp theme")
      .exec();

    await Gathering.findByIdAndUpdate(gatheringId, {
      $push: { messages: createdMessage._id },
    });

    const gathering = await Gathering.findById(gatheringId).populate("members");

    const finalData = { ...messageData._doc, gatheringId: gathering._id };

    if (gathering && gathering.members) {
      gathering.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("receive-gathering-message", finalData);
        }
      });
    }
    const adminSocketId = userSocketMap.get(gathering.admin._id.toString());
    if (adminSocketId) {
      io.to(adminSocketId).emit("receive-gathering-message", finalData);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }
    socket.on("sendMessage", sendMessage);
    socket.on("send-gathering-message", sendGatheringMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
