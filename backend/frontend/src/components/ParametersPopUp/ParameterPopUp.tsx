import React from 'react';
import AddPara from "components/ParametersPopUp/AddParameter";
import "./ParametersPopUp.scss";

function ParameterPopUp(): JSX.Element {


    return(
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
    );
}

export default ParameterPopUp;