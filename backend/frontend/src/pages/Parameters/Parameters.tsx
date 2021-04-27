import React, {} from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
import addType from "shared/icons/addtype_1.svg";

function Parameters(): JSX.Element {

  return (
    <div className="add-type-page">
        
        <div className="add-type-modal">
            <div className="add-type-popup">
                <p className="add-type-title">Add new type</p>
                <p className="add-type-label">Name</p>
                <input className="add-type-input" type="text"/>
                <input className="add-type-submit" type="submit" value="Add"/>
            </div>
      </div>
      <Header username="MillerGinger" isAdmin={true} />
      <div className="body-container">
        <p>ola</p>
      </div>
      <div className="add-type-button">
        <button><img src={addType} className="add-type-image" /></button>
      </div>
      {/* <BottomCornerImage /> */}
    </div>
  );
}

export default Parameters;