import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  clearUnseenMessagesFrom,
} from "./store/conversations";
import {
  updateMessages,
  sendClearUnseenMessagesFrom,
} from "./store/utils/thunkCreators";

const getActiveConversation = () => {
  const { conversations, activeConversation } = store.getState();

  return conversations.find(
    (conversation) => conversation.otherUser.username === activeConversation
  );
};

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
    const convo = getActiveConversation();

    let message = data.message;

    if (convo && convo.otherUser.id === message.senderId) {
      message = { ...data.message, seen: true };
      updateMessages(convo.otherUser).then((res) => {
        sendClearUnseenMessagesFrom(convo.id, message.senderId);
      });
    }

    store.dispatch(setNewMessage(message, data.sender));
  });

  socket.on("clear-unseen-messages", (data) => {
    store.dispatch(
      clearUnseenMessagesFrom(data.conversationId, data.messageSenderId)
    );
  });
});

export default socket;
