import React, { useState } from "react";
import "./Flag.scss";
import flag from "shared/icons/flag.svg";
import flagSelected from "shared/icons/flagSelected.svg";
import axios from "axios";


interface IFlag {
  userId: string
  flagged: boolean
}

function Flag(OFlagged: IFlag): JSX.Element {
  const [flagged, setFlagged] = useState(OFlagged.flagged);

  function setFlag() {
    setFlagged(!flagged);
    axios.get("/api/users/" + OFlagged.userId + "/flag");

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