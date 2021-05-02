import React from 'react';
import AddPara from "components/ParametersPopUp/AddParameter";
import "./ParametersPopUp.scss";
import Popup from 'reactjs-popup';
import addParameter from "shared/icons/addparameter.svg";

function ParameterPopUp(): JSX.Element {


    return(

        <Popup trigger={<button className="parameter-submit"><img src={addParameter} className="add-parameter-image" /></button>} position="right center">
                <div className="parameters-pop-up">
            <div>
                <h1>Add new parameter</h1>

                <button>Save button</button>
            </div>
            <a>+ add new parameter</a>

            <div>
                <AddPara />
            </div>


        </div>
      </Popup>

    );
}

export default ParameterPopUp;