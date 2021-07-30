import io from "socket.io-client";
import axios from "axios";
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
    const { activeConversation } = store.getState();
    let message = data.message;

    // user is in chat when receiving the message, mark message as true
    if (activeConversation === message.conversationId) {
      message.seen = true;

      // update message in db
      axios.put("/api/messages", { conversationId: activeConversation });

      // tell message sender to clear his own message
      socket.emit("clear-unseen-messages", {
        conversationId: message.conversationId,
        otherUserId: message.senderId,
      });
    }

    store.dispatch(setNewMessage(activeConversation, message, data.sender));
  });

  socket.on("clear-unseen-messages", (data) => {
    store.dispatch(clearUnseenMessagesFrom(data));
  });
});

export default socket;
