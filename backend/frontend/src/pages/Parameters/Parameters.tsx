import React, { useEffect } from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
import addType from "shared/icons/addtype_1.svg";
import trash from "shared/icons/caixote lixo.svg";
import Modal from "@material-ui/core/Modal";
import ParametersPopUp from "components/ParametersPopUp/ParameterPopUp";
import axios from "axios";

interface Constraint {
  constraint: string;
  value: string;
}

interface Parameter {
  param: string;
  constraints: Constraint[];
}

interface FileType {
  _id: string;
  name: string;
  parameters: Parameter[];
}

function Parameters(): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(
    document.createElement("input")
  );
  const [openModal, setModalOpen] = React.useState(false);
  const [fileTypes, setFileTypes] = React.useState<FileType[]>([]);

  useEffect(() => {
    axios.get("/api/types").then((res) => setFileTypes(res.data));
  }, []);

  const handleOnAddFileType = (name: string) => {
    const newFileType = {
      name,
      parameters: [],
    };

    axios.post("/api/types/add", newFileType, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => setFileTypes([...fileTypes, res.data]));
  };

  const handleOnRemoveFileType = (index: number) => {

    const removefileType = fileTypes[index];

    const newFileTypes = fileTypes.filter((_, arrayIndex) => arrayIndex !== index);

    axios.delete(`/api/types/${removefileType._id}`).then(() => setFileTypes(newFileTypes));

  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const modalBody = () => {
    const handleOnClickButton = () => {
      handleOnAddFileType(inputRef.current.value);
      handleModalClose();
    };

    return (
      <div className="add-type-popup">
        <p className="add-type-title">Add new type</p>
        <p className="add-type-label">Name</p>
        <input ref={inputRef} className="add-type-input" type="text" />
        <button
          className="add-type-submit"
          id="add-type"
          type="submit"
          value="Add"
          onClick={handleOnClickButton}
        >
          Add
        </button>
      </div>
    );
  };

  return (
    <div className="add-type-page">
      <Modal
        BackdropProps={{
          style: { backgroundColor: "rgba(160, 155, 155, 0.2)" },
        }}
        open={openModal}
        onClose={handleModalClose}
        className="add-type-modal"
      >
        {modalBody()}
      </Modal>
      <Header username="MillerGinger" isAdmin={true} />
      <div className="body-container content">
        {fileTypes.map((fileType, fileTypeIndex) => (
          <div key={`${fileType.name}-${fileTypeIndex}`} className="type-block">
            <header>
              <p className="type-name">{fileType.name}</p>
              <button
                onClick={() => handleOnRemoveFileType(Number(fileTypeIndex))}
              >
                <img src={trash} className="icon trash" />
              </button>
            </header>
            <div className="type-block-content">
              {fileType.parameters && fileType.parameters.map((parameter, parameterIndex) => (
                <div key={`${parameter.param}-${parameterIndex}`}>
                  <p className="type-parameter">{parameter.param}</p>
                  {parameter.constraints.map((constraint, contrainsIndex) => (
                    <div
                      key={`${constraint.constraint}-${contrainsIndex}`}
                      className="type-constraint"
                    >
                      <p>{constraint.constraint}</p>
                      <p>{constraint.value}</p>
                    </div>
                  ))}
                </div >
              ))}
            </div>
              <div className="add-parameter">
                <ParametersPopUp file={fileType} />
              </div>
          </div>
        ))}
      </div>
        <button className="add-type" onClick={handleModalOpen}>
          <img src={addType} className="icon add-type" />
        </button>
    </div>
  );
}

export default Parameters;
