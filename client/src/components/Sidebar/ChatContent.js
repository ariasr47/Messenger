import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: (props) => (props.hasUnseenMessages ? "black" : "#9CADC8"),
    letterSpacing: -0.17,
    fontWeight: (props) => (props.hasUnseenMessages ? 600 : 400),
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const getUnseenMessages = (messages, senderId) => {
  return messages.filter(
    (message) => message.senderId === senderId && message.seen === false
  );
};

const ChatContent = (props) => {
  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const unseenMessages = getUnseenMessages(
    conversation.messages,
    conversation.otherUser.id
  );

  const classes = useStyles({ hasUnseenMessages: unseenMessages.length > 0 });

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unseenMessages.length > 0 && (
        <Typography className={classes.notification} fontWeight={700}>
          {unseenMessages.length}
        </Typography>
      )}
    </Box>
  );
};

export default ChatContent;
