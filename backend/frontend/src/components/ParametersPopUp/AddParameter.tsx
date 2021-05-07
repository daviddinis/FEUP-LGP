import React, { useState } from 'react';
import "./ParametersPopUp.scss";
import newParameter from  "shared/icons/newParameter.svg";

function AddParameter(): JSX.Element {

    const [numberOfConstraints, addConstraint] = useState(1);

    const newConstraint = () => {
        let temp = numberOfConstraints;
        temp++;
        addConstraint(temp);
    };

    const constraints = [];

    for (let index = 0; index < numberOfConstraints; index++) {
        constraints.push(
            <div className="select-section">
                <select className="parameter-select">
                    <option value="  double chocolate"> Double Chocolate</option>
                    <option value="  vanilla"> Vanilla</option>
                    <option value="  strawberry" selected> Strawberry</option>
                    <option value="  caramel"> Caramel</option>
                </select>
                    
                <div className="parameter-select-input"> <input className="parameter-select-input-text" type="text" /></div>
            </div>
        );
        
    }

    return(
        <div className="parameter-add-name">
            <label className="parameter-name">Parameter name</label>
           <div><input type="text" className="parameter-input" placeholder="  parameter name"/></div> 

            <div>
                <p className="constraints-text">Constraints</p>
                {constraints}
                <button onClick={newConstraint} className="new-constraint"><img src={newParameter} className="new-constraint-image" /> <div className="new-constraint-text">add new constraint</div> </button>
            </div>
            
        </div>
    );
}

export default AddParameter;