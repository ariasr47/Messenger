import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  clearUnseenMessagesFrom,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    const { conversations, activeConversation } = store.getState();
    const convo = conversations.find(
      (conversation) => conversation.otherUser.username === activeConversation
    );
    let message = data.message;
    if (convo && convo.otherUser.id === data.message.senderId) {
      message = { ...data.message, seen: true };
    }
    store.dispatch(setNewMessage(message, data.sender));
  });

  socket.on("clear-unseen-messages", (data) => {
    store.dispatch(
      clearUnseenMessagesFrom(data.otherUserId, data.messageSenderId)
    );
  });
});

export default socket;
