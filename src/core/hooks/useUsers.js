import { useState } from "react";
import { USERS } from "../constants";

export const useUsers = () => {
  // simple store to contain current user
  const [currentUser, setCurrentUser] = useState(USERS[1]);

  const isCurrentlyPublisher = currentUser.title === USERS[0].title;

  // switcher to become publisher
  const onSwitchToPublisher = () => {
    setCurrentUser(USERS[0]);
  };

  // switcher to become consumer
  const onSwitchToConsumer = () => {
    setCurrentUser(USERS[1]);
  };

  return {
    currentUser,
    isCurrentlyPublisher,
    onSwitchToPublisher,
    onSwitchToConsumer,
  };
};
