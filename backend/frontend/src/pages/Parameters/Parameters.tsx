import React, {useEffect, useState} from "react";
import "./Parameters.scss";
import Header from "components/Header/Header";
// import BottomCornerImage from "components/BottomCornerImage/BottomCornerImage";


function Parameters(): JSX.Element {

  return (
    <div className="registered-users-page">
      <Header username="MillerGinger" isAdmin={true} />
      <div className="body-container">
        <p>ola</p>
        
      </div>
      <div className="ola">
        <p>ola</p>
      </div>
      {/* <BottomCornerImage /> */}
    </div>
  );
}

export default Parameters;