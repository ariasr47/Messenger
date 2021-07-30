const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

const hasAccess = (userId, conversation) => {
  return userId === conversation?.user1Id || userId === conversation?.user2Id;
};

// expects { recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;

    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const conversation = await Conversation.findByPk(conversationId);

      // check if sender has access to conversation
      if (!hasAccess(senderId, conversation)) {
        return res.sendStatus(403);
      }

      const message = await Message.create({
        senderId,
        text,
        conversationId,
      });

      return res.json({ message, sender });
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });

      if (onlineUsers.hasOwnProperty(sender.id)) {
        sender.online = true;
      }
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });

    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const userId = req.user.id;

    const { conversationId } = req.body;

    const conversation = await Conversation.findByPk(conversationId);

    // check whether conversation exists
    if (!conversation) {
      return res.sendStatus(404);
    }

    // check if user has access to conversation
    if (!hasAccess(userId, conversation)) {
      return res.sendStatus(403);
    }

    const otherUserId =
      userId !== conversation.user1Id
        ? conversation.user1Id
        : conversation.user2Id;

    await Message.update(
      {
        seen: true,
      },
      {
        where: {
          senderId: otherUserId,
          conversationId: conversation.id,
        },
      }
    );

    return res.json({ userId, otherUserId });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
