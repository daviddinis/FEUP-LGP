import React from 'react';
import "./ParametersPopUp.scss";
import newParameter from  "shared/icons/newParameter.svg";

function AddParameter(): JSX.Element {


    return(
        <div className="parameter-add-name">
            <label className="parameter-name">Parameter name</label>
           <div><input type="text" className="parameter-input" placeholder="  parameter name"/></div> 

            <div>
                <p className="constraints-text">Constraints</p>
                <div className="select-section">
                    <select className="parameter-select">
                        <option value="  double chocolate"> Double Chocolate</option>
                        <option value="  vanilla"> Vanilla</option>
                        <option value="  strawberry" selected> Strawberry</option>
                        <option value="  caramel"> Caramel</option>
                    </select>
                    
                    <div className="parameter-select-input"> <input className="parameter-select-input-text" type="text" /></div>
                </div>
                <button className="new-constraint"><img src={newParameter} className="new-constraint-image" /> <div className="new-constraint-text">add new constraint</div> </button>
            </div>
            
        </div>
    );
}

export default AddParameter;