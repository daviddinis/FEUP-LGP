import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./SelectTypePopup.scss";
import axios from "axios";

interface Props {
  onSubmit(type: string) : void,
}

const SelectTypePopup = (props: Props): JSX.Element => {

  const [type, setType] = useState("");
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/types").then(res => {
      setTypes(res.data.map((fileType : any) => fileType.name));
    });
  }, [])

  const onTypeChanged = (e : ChangeEvent<HTMLInputElement>) => {
      setType(e.target.value);
  }
  const onSubmit = (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.onSubmit(type)
  }

  return (
      <form onSubmit={onSubmit}>
        <h2>Select the document type</h2>

        {types.map(fileType => (
            <div key={fileType}>
              <input type="radio" id={`FileType-${fileType}`} name="fileType" onChange={onTypeChanged} value={fileType}/>
              <label htmlFor={`FileType-${fileType}`}>{fileType}</label>
            </div>
        ))}

        <button type="submit">Submit</button>
      </form>
  )
};

export default SelectTypePopup;
