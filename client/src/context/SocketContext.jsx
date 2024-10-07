import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo, addContactsInDuoContacts } = useAppStore();
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server.");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();
        if (
          (selectedChatType !== undefined &&
            selectedChatData._id === message.sender._id) ||
          selectedChatData._id === message.recipient._id
        ) {
          addMessage(message);
        }
        addContactsInDuoContacts(message);
      };

      const handleReceiveGatheringMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addGatheringInGatheringsList,
        } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.gatheringId
        ) {
          addMessage(message);
        }
        addGatheringInGatheringsList(message);
      };

      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on(
        "receive-gathering-message",
        handleReceiveGatheringMessage
      );

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
