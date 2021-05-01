import React, { Fragment } from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
import addType from "shared/icons/addtype_1.svg";
import addParameter from "shared/icons/addparameter.svg";
import trash from "shared/icons/caixote lixo.svg";
import Modal from '@material-ui/core/Modal';

interface Constraint {
  name: string,
  value: string,
}

interface Parameter {
  name: string,
  contraints: Constraint[],
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
      contraints: [
        {
          name: 'constrant_1',
          value: 'value',
        },
        {
          name: 'constrant_1',
          value: 'value',
        },{
          name: 'constrant_1',
          value: 'value',
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
          {/* TODO: Forçaaaa Mafaldaaaaaaaaa */}
          { fileTypes.map((fileType, index) => (
            <div 
              key={ `${fileType.name}-${index}` }
              className="type-block"  >
              <header className="type-block-header">
                <p className="type-name">{ fileType.name }</p>
                <button className="trash-button" onClick={ () => handleOnRemoveFileType(Number(index)) }>
                  <img src={trash} className="trash-image" /></button>
              </header>
              <div className="type-block-content">
              {
                fileType.parameters.map((parameter, index) => (
                  <Fragment 
                  key={ `${parameter.name}-${index}` }>
                    <p className="type-parameter">{ parameter.name }</p>
                    {
                      parameter.contraints.map((constraint, index) => (
                        <p 
                          key={ `${constraint.name}-${index}` }
                          className="type-constraint" >
                          { constraint.name }
                        </p>
                      ))
                    }
                  </Fragment>
                ))
              }
              </div>
              <footer className="type-block-footer">
                <img src={addParameter} className="add-parameter-image" />
              </footer>
            </div>
          )) }
      </div>
      <div className="add-type-button">
        <button onClick={handleModalOpen}><img src={addType} className="add-type-image" /></button>
      </div>
    </div>
  );
}

export default Parameters;