import React from "react";
import { USERS } from "../../constants";
import "./SwitchUser.css";

import { Button } from "@mui/material";

// Component to switch the users
export const SwitchUser = ({
  currentUser,
  onSwitchToConsumer,
  onSwitchToPublisher,
  isCurrentlyPublisher,
}) => {
  // saving the 'not selected' role to obtain styles, texts
  const anotherRole = USERS.find(({ title }) => title !== currentUser.title);

  const currentRoleText = `You are currently ${currentUser.title}`;
  const switchRoleText = `Switch to ${anotherRole.title}`;

  const publisherButtonColor = isCurrentlyPublisher ? "success" : "primary";
  const consumerButtonColor = !isCurrentlyPublisher ? "success" : "primary";

  return (
    <div className="switchUser">
      <Button
        fullWidth={true}
        variant="contained"
        color={publisherButtonColor}
        onClick={onSwitchToPublisher}
      >
        {isCurrentlyPublisher ? currentRoleText : switchRoleText}
      </Button>
      <Button
        fullWidth={true}
        variant="contained"
        color={consumerButtonColor}
        onClick={onSwitchToConsumer}
      >
        {!isCurrentlyPublisher ? currentRoleText : switchRoleText}
      </Button>
    </div>
  );
};
