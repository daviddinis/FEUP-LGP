import React, { useState } from "react";
import "./Flag.scss";
import flag from "shared/icons/flag.svg";
import flagSelected from "shared/icons/flagSelected.svg";
import { updateUserFlag } from "./Api";

interface IFlag {
  flagged: boolean
}

function Flag(OFlagged: IFlag): JSX.Element {
  const [flagged, setFlagged] = useState(OFlagged.flagged);

  function setFlag() {
    setFlagged(!flagged);
    updateUserFlag("1"); //TODO
  }

  return (
    <button onClick={() => setFlag()}>
      <img
        src={flagged ? flagSelected : flag}
        className="icon flag"
      />
    </button>
  );
}

export default Flag;