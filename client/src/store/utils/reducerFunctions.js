const byMostRecent = function (convo1, convo2) {
  const d1 = new Date(convo1.messages[convo1.messages.length - 1].createdAt);
  const d2 = new Date(convo2.messages[convo2.messages.length - 1].createdAt);

  return d2 - d1;
};

export const addMessageToStore = (state, payload) => {
  const { activeConversation, message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.recentActivity = message.createdAt;
    newConvo.unreadMessageCount += 1;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.recentActivity = message.createdAt;
      if (activeConversation != message.conversationId)
        convoCopy.unreadMessageCount += 1;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const updateUnseenMessagesFromStore = (state, data) => {
  const { conversationId, messageSenderId, currentUserId } = data;

  return state.map((convo) => {
    if (convo.id === conversationId) {
      let lastMessageReadByOtherUser = -1;

      const newMessages = convo.messages.map((message) => {
        if (message.senderId === currentUserId)
          lastMessageReadByOtherUser = message.id;

        if (message.senderId === messageSenderId && !message.seen)
          return { ...message, seen: true };

        return message;
      });

      return {
        ...convo,
        messages: newMessages,
        lastMessageReadByOtherUser: lastMessageReadByOtherUser,
        unreadMessageCount: 0,
      };
    }
    return convo;
  });
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state
    .map((convo) => {
      if (convo.otherUser.id === recipientId) {
        const newConvo = { ...convo };
        newConvo.id = message.conversationId;
        newConvo.messages.push(message);
        newConvo.recentActivity = message.createdAt;
        newConvo.latestMessageText = message.text;
        return newConvo;
      }
      return convo;
    })
    .sort(byMostRecent);
};
