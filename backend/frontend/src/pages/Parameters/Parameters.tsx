import React, { Fragment } from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
import addType from "shared/icons/addtype_1.svg";
import trash from "shared/icons/caixote lixo.svg";
import Modal from '@material-ui/core/Modal';
import Para from "components/ParametersPopUp/ParameterPopUp";

interface Constraint {
  parameter: number,
  name: string,
  value: string,
}

interface Parameter {
  name: string,
  constraints: Constraint[],
}

interface FileType {
  name: string,
  parameters: Parameter[],
}

const mockFile = {
  name: 'file_type_1',
  parameters: [
    {
      name: 'parameter_1',
      constraints: [
        {
          parameter: 0,
          name: '  lt',
          value: '0',
        },
        {
          parameter: 0,
          name: '  lt',
          value: '1',
        },{
          parameter: 0,
          name: '  lt',
          value: '2',
        }

      ]
    },
  ]
};

function Parameters(): JSX.Element {
    const inputRef = React.useRef<HTMLInputElement>(document.createElement('input'));
    const [openModal, setModalOpen] = React.useState(false);
    const [fileTypes, setFileTypes] = React.useState<FileType[]>([mockFile]);

    const handleOnAddFileType = (name: string) => {
        const newFileType = {
          name,
          parameters: [],
        }

        const newFileTypes = [...fileTypes, newFileType];

        setFileTypes(newFileTypes);
    }

    const handleOnRemoveFileType = (index: number) => {
      const newFileTypes = fileTypes.filter((_, arrayIndex) => arrayIndex !== index);

      setFileTypes(newFileTypes);
    }

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
      } 

    
      return (
        <div className="add-type-popup">
            <p className="add-type-title">Add new type</p>
            <p className="add-type-label">Name</p>
            <input ref={ inputRef } className="add-type-input" type="text"/>
            <button className="add-type-submit" id="add-type" type="submit" value="Add" onClick={handleOnClickButton}>
              Add
            </button>
        </div>
      )
    }

  return (
    <div className="add-type-page">
        <Modal
            BackdropProps={{ style: { backgroundColor: "rgba(160, 155, 155, 0.2)" } }}
            open={openModal}
            onClose={handleModalClose}
            className="add-type-modal">
            {
              modalBody()
            }
        </Modal>
      <Header username="MillerGinger" isAdmin={true} />
      <div className="body-container">
          { fileTypes.map((fileType, fileTypeIndex) => (
            <div 
              key={ `${fileType.name}-${fileTypeIndex}` }
              className="type-block"  >
              <header className="type-block-header">
                <p className="type-name">{ fileType.name }</p>
                <button className="trash-button" onClick={ () => handleOnRemoveFileType(Number(fileTypeIndex)) }>
                  <img src={trash} className="trash-image" /></button>
              </header>
              <div className="type-block-content">
              {
                fileType.parameters.map((parameter, parameterIndex) => (
                  <Fragment 
                  key={ `${parameter.name}-${parameterIndex}` }>
                    <p className="type-parameter">{ parameter.name }</p>
                    {
                      parameter.constraints.map((constraint, contrainsIndex) => (
                        <div key={ `${constraint.name}-${contrainsIndex}` }>
                        <p className="type-constraint" >
                          { constraint.name }
                        </p>
                        <p>{constraint.value}</p></div>
                      ))
                    }
                  </Fragment>
                ))
              }
              </div>
              <footer className="type-block-footer">
                <div className="add-parameter-button">
                  <Para file={fileType}/>
                </div>
              </footer>
            </div>
          )) }
      </div>
      <div className="add-type-button">
        <button onClick={handleModalOpen}><img src={addType} className="add-type-image" />hjguj</button>
      </div>
    </div>
  );
}

export default Parameters;