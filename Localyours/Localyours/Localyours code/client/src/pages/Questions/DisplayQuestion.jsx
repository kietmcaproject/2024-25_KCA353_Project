import React from "react";
import QuestionsDetails from "./QuestionsDetails";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <QuestionsDetails />
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
