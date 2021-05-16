import React, {useState} from 'react';
import newParameterIcon from  "shared/icons/newParameter.svg";
import axios from 'axios'
import "./ParametersPopUp.scss";
import Popup from 'reactjs-popup';
import trash from "shared/icons/delete.svg";
import newParameter from  "shared/icons/newParameter.svg";
import addParameterIcon from "shared/icons/addparameter.svg";

interface fileType {
    name: string,
    parameters: Parameter[]
}

interface Constraint {
    parameter: number,
    name: string,
    value: string,
}

interface Parameter {
  name: string,
  constraints: Constraint[],
}

function ParameterPopUp(props: {file: fileType}): JSX.Element {

    const [fileType, updateFileType] = useState<string>(props.file.name);
    const [parametersArray, updateParameters] = useState<Parameter[]>(props.file.parameters);
    const [constraintArray, updateConstraints] = useState<Constraint[]>([]);

    
    const Save = () => {
        axios.put('/api/types/1', {name: fileType, parameters: parametersArray});
    }

    const handleFileTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const file = value;
        updateFileType(file);
    }

    const addParameter = () => {

        const constraint = {
            parameter: parametersArray.length,
            name: "  lt",
            value: "" 
        }

        const newPara = {
            name: "",
            constraints: [constraint]
        };

        const newParameters = [...parametersArray, newPara];

        updateParameters(newParameters);
    }

    const removeParameter = (index: number) => {
        const newParameters = parametersArray.filter((_, arrayIndex) => arrayIndex !== index);

        updateParameters(newParameters);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;        
        const array = [...parametersArray];
        array[index].name = value;
        updateParameters(array);
    }

    const addConstraint = (pindex: number) => {
        const newConstraint = {
            parameter: pindex,
            name: "  lt",
            value: "",
        }
        
        const temp = [...parametersArray];
        temp[pindex].constraints.push(newConstraint);
        updateParameters(temp);
    }

    const removeConstraint = (index: number, pindex: number) => {
        const p = [...parametersArray];

        p[pindex].constraints = p[pindex].constraints.filter((_, arrayIndex) => arrayIndex !== index);

        updateParameters(p);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number, pindex: number) => {
        const p = [...parametersArray];
        const value = e.target.value;
        p[pindex].constraints[index].name = value;
        
        updateParameters(p);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, pindex: number) => {
        const p = [...parametersArray];
        const value = e.target.value;
        p[pindex].constraints[index].value = value;
        
        updateParameters(p);
    }

    return(
        <Popup trigger={<button className="parameter-submit"><img src={addParameterIcon} className="add-parameter-image" /></button>} position="right center">
        <div>
            <div className="parameters-pop-up">
                <div className="submit-section">
                    <input className="file-type" type="text" value={fileType} onChange={e => handleFileTypeChange(e)}/>
                    <button className="save-button" onClick={Save}>Save</button>
                </div>
                    
                <button className="new-parameter" onClick={addParameter}>
                    <img src={newParameterIcon} className="new-parameter-image" /> 
                    <div className="new-parameter-text">add new parameter</div> 
                </button>

                <div className="scrollbar">
                    {parametersArray.map((p, pindex) => {
                        return(
                        <div key={ `${p}-${pindex}`} className="parameter-div">
                            <label className="parameter-name">Parameter name</label>
                            <div>  
                                <input className="parameter-input" type="text" placeholder="parameter name" value={p.name} onChange={e => handleNameChange(e, pindex)}/>
                                <button onClick={() => removeParameter(Number(pindex))}>
                                    <img src={trash} className="trash-paramter-image" />
                                </button>
                            </div> 
                                
                            <div className="parameter-add-name">
                                <p className="constraints-text">Constraints</p>
                                {p.constraints.map((c, index) => {
                                        return(
                                        <div key={ `${c.name}-${index}`} className="select-section">
                                            <select value={c.name} className="parameter-select" onChange={e => handleSelectChange(e, index, pindex)}>
                                                <option value="  lt"> Less </option>
                                                <option value="  gt"> Greater </option>
                                                <option value="  lte"> Less or Equal </option>
                                                <option value="  gte"> Greater or Equal</option>
                                                <option value="  eq"> Equal </option>
                                                <option value="  oneOf"> One of </option>
                                                <option value="  contains"> Contains </option>
                                                <option value="  containsParam"> Contains Parameter </option>
                                            </select>
                                                        
                                            <div className="parameter-select-input"> 
                                                <input className="parameter-select-input-text" type="text" value={c.value} onChange={e => handleValueChange(e, index, pindex)}/>
                                            </div>
                                                
                                            <button onClick={() => removeConstraint(index, pindex)}><img src={trash} className="trash-image" /></button>
                                        </div>)
                                })}
                                <button onClick={() => addConstraint(pindex)} className="new-constraint">
                                    <img src={newParameter} className="new-constraint-image" /> 
                                    <div className="new-constraint-text">add new constraint</div> 
                                </button>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
        </Popup>

    ); 
}

export default ParameterPopUp;