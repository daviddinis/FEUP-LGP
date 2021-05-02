import React, {} from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
import addType from "shared/icons/addtype_1.svg";
import Modal from '@material-ui/core/Modal';

import Para from "components/ParametersPopUp/ParameterPopUp";


function Parameters(): JSX.Element {
    const [openModal, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
      };
    
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const modalBody = (
        <div className="add-type-popup">
            <p className="add-type-title">Add new type</p>
            <p className="add-type-label">Name</p>
            <input className="add-type-input" type="text"/>
            <input className="add-type-submit" id="add-type" type="submit" value="Add" onClick={handleModalClose}/>
        </div>
    )

  return (
    <div className="add-type-page">
        <Modal
            BackdropProps={{ style: { backgroundColor: "rgba(160, 155, 155, 0.2)" } }}
            open={openModal}
            onClose={handleModalClose}
            className="add-type-modal">
            {modalBody}
        </Modal>
      <Header username="MillerGinger" isAdmin={true} />
      <div className="body-container">
          {/* TODO: Forçaaaa Mafaldaaaaaaaaa */}
      </div>
      <div className="add-type-button">
        <button onClick={handleModalOpen}><img src={addType} className="add-type-image" /></button>
      </div>
    </div>
  );
}

export default Parameters;