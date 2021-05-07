import React, {useState} from 'react';
import AddPara from "components/ParametersPopUp/AddParameter";
import newParameterIcon from  "shared/icons/newParameter.svg";
import "./ParametersPopUp.scss";
import Popup from 'reactjs-popup';
import addParameterIcon from "shared/icons/addparameter.svg";

function ParameterPopUp(): JSX.Element {

    const [numberOfParameters, addParameter] = useState(1);

    const newParameter = () => {
        let temp = numberOfParameters;
        temp++;
        addParameter(temp);
    };

    const parameters = [];

    for (let index = 0; index < numberOfParameters; index++) {
        parameters.push(
            <AddPara />
        );
        
    }

    return(
        <Popup trigger={<button className="parameter-submit"><img src={addParameterIcon} className="add-parameter-image" /></button>} position="right center">
        <div>
            <div className="parameters-pop-up">
                <div className="submit-section">
                    <button className="save-button">Save</button>
                        <h1 className="title-Popup">Add new parameter</h1>
                </div>
                
                <button onClick={newParameter} className="new-parameter"><img src={newParameterIcon} className="new-parameter-image" /> <div className="new-parameter-text">add new parameter</div> </button>
            

                <div className="scrollbar">
                    {parameters}
                </div>


            </div>
        </div>
        </Popup>
    );
}

export default ParameterPopUp;