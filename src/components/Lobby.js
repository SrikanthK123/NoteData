import React from "react";
import Notes from "./Notes";

const Lobby = (props) => {
  const {showAlert} = props
  return (
    <>
      
      <Notes showAlert = {showAlert} />
    </>
  );
};

export default Lobby;
