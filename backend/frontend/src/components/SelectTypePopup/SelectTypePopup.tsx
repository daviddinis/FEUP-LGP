import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./SelectTypePopup.scss";
import axios from "axios";
import Modal from "@material-ui/core/Modal";

interface Props {
    isOpen: boolean,
    onClose() : void,
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
      <Modal
          BackdropProps={{
              style: { backgroundColor: "rgba(160, 155, 155, 0.2)" },
          }}
          open={props.isOpen}
          onClose={props.onClose}
          className="select-type-modal"
      >
          <form onSubmit={onSubmit} className="select-type-form">
              <h2>Select the document type</h2>

              {types.map(fileType => (
                  <label key={fileType} className="select-type-label">
                      <input type="radio" name="fileType" onChange={onTypeChanged} value={fileType}/>
                      <span className="checkmark">
                          <span className="checkmark-dot"/>
                      </span>
                      {fileType}
                  </label>
              ))}

              <button type="submit">Submit</button>
          </form>
      </Modal>

  )
};

export default SelectTypePopup;
