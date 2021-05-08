import React, { useState } from 'react';
import "./ParametersPopUp.scss";
import newParameter from  "shared/icons/newParameter.svg";
import trash from "shared/icons/delete.svg";

interface Constraint {
    name: string,
    value: string,
}

const mockFile = {
    name: "",
    value: ""
};

function AddParameter(): JSX.Element {

    const [constraintArray, updateConstraint] = useState<Constraint[]>([mockFile]);

    const addConstraint = () => {
        const newFileType = {
          name: "a",
          value: "",
        }
        
        const newFileTypes = [...constraintArray, newFileType];

        updateConstraint(newFileTypes);
    }

    const removeConstraint = (index: number) => {
        const newFileTypes = constraintArray.filter((_, arrayIndex) => arrayIndex !== index);

        updateConstraint(newFileTypes);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const array = [...constraintArray];
        array[index].value = value;
        updateConstraint(array);
    }

    return(
        <div className="parameter-add-name">
            <label className="parameter-name">Parameter name</label>
           <div><input type="text" className="parameter-input" placeholder="  parameter name"/></div> 

            <div>
                <p className="constraints-text">Constraints</p>
                {constraintArray.map((c, index) => {
                    return(
                    <div key={ `${c.name}-${index}`} className="select-section">
                        <select className="parameter-select">
                            <option value="  double chocolate"> Double Chocolate</option>
                            <option value="  vanilla"> Vanilla</option>
                            <option value="  strawberry"> Strawberry</option>
                            <option value="  caramel"> Caramel</option>
                        </select>
                            
                        <div className="parameter-select-input"> 
                            <input className="parameter-select-input-text" type="text" value={c.value} onChange={e => handleValueChange(e, index)}/>
                        </div>
                    
                        <button onClick={() => removeConstraint(Number(index))}><img src={trash} className="trash-image" /></button>
                    </div>)
                })}
                
                <button onClick={addConstraint} className="new-constraint"><img src={newParameter} className="new-constraint-image" /> <div className="new-constraint-text">add new constraint</div> </button>
            </div>
            
        </div>
    );
}

export default AddParameter;