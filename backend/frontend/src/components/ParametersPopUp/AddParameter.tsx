import React from 'react';
import "./ParametersPopUp.scss";

function AddParameter(): JSX.Element {


    return(
        <div>
            <label>Parameter name</label>
            <input type="text" className="parameter-input" placeholder="parameter name"/>

            <div>
                <p>Constraints</p>
                <div>
                    <select className="parameter-input">
                        <option value="double chocolate">Double Chocolate</option>
                        <option value="vanilla">Vanilla</option>
                        <option value="strawberry" selected>Strawberry</option>
                        <option value="caramel">Caramel</option>
                    </select>
                    
                    <input className="parameter-input" type="text" />
                </div>
                <p>+ add new constraint</p>
            </div>
            
        </div>
    );
}

export default AddParameter;