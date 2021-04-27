import React, {} from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
import addType from "shared/icons/addtype_1.svg";
import Modal from '@material-ui/core/Modal';

function Parameters(): JSX.Element {

    const body = (
        <div className="add-type-popup">
            <p className="add-type-title">Add new type</p>
            <p className="add-type-label">Name</p>
            <input className="add-type-input" type="text"/>
            <input className="add-type-submit" type="submit" value="Add"/>
        </div>
    )

    const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="add-type-page">
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="add-type-modal">
            {body}
        </Modal>
        <div className="add-type-modal">
            
      </div>
      <Header username="MillerGinger" isAdmin={true} />
      <div className="body-container">
        <p>ola</p>
      </div>
      <div className="add-type-button">
        <button onClick={handleOpen}><img src={addType} className="add-type-image" /></button>
      </div>
      {/* <BottomCornerImage /> */}
    </div>
  );
}

export default Parameters;