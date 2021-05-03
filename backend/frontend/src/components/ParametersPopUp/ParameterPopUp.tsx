import React from 'react';
import AddPara from "components/ParametersPopUp/AddParameter";
import newParameter from  "shared/icons/newParameter.svg";
import "./ParametersPopUp.scss";
import Popup from 'reactjs-popup';
import addParameter from "shared/icons/addparameter.svg";

function ParameterPopUp(): JSX.Element {


    return(

        <Popup trigger={<button className="parameter-submit"><img src={addParameter} className="add-parameter-image" /></button>} position="right center">
                <div className="parameters-pop-up">
            <div className="submit-section">
            <button className="save-button">Save</button>
            
                <h1 className="title-Popup">Add new parameter</h1>

               
            </div>
            
            <button className="new-parameter"><img src={newParameter} className="new-parameter-image" /> <div className="new-parameter-text">add new parameter</div> </button>
           

            <div>
                <AddPara />
            </div>


        </div>
      </Popup>

    );
}

export default ParameterPopUp;