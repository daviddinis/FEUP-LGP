import React from "react";
import { useHistory } from "react-router";
import arrow from "shared/icons/arrow.svg";
import "./BackButton.scss";

const BackButton = (): JSX.Element => {


  const history = useHistory();

  function goBackHistory() {
    history.goBack();
  }

  return (
    <button onClick={goBackHistory} className={"icon back-arrow"} >
      <img src={arrow} />
    </button>
  );
};

export default BackButton;
