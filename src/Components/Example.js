import React, { useState, useEffect } from "react";
import "../Styles/Example.css";
import ExamplesData from "./ExamplesData";
import { useDispatch } from "react-redux";
import { setUserInput } from "../redux/slices/userInputSlice";

const Example = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [examplesVisible, setExamplesVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setExamplesVisible(true);
  }, []);

  const renderExampleButtons = () => {
    return ExamplesData.map((example, index) => (
      <a
        key={index}
        onClick={() => handleButtonClick(index)}
        className="ExampleButton"
        href="#"
      >
        <span className={clickedButtonIndex === index ? "example1Clicked" : ""}>
          Example {index + 1}
        </span>
      </a>
    ));
  };

  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    dispatch(setUserInput(ExamplesData[index]));
  };

  return <div className="container">{renderExampleButtons()}</div>;
};

export default Example;
