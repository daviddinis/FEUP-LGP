import React, {useState} from 'react';
import newParameterIcon from  "shared/icons/newParameter.svg";
import "./ParametersPopUp.scss";
//import Popup from 'reactjs-popup';
import trash from "shared/icons/delete.svg";
import newParameter from  "shared/icons/newParameter.svg";

interface Constraint {
    parameter: number,
    select: string,
    value: string,
}

const constraintMockFile = {
    parameter: 0,
    select: "  double chocolate",
    value: ""
}

interface Parameter {
    name: string
    constraints: Constraint[];
}

const parameterMockFile = {
    name: "",
    constraints: [constraintMockFile]
};


function ParameterPopUp(): JSX.Element {

    const [parametersArray, updateParameters] = useState<Parameter[]>([parameterMockFile]);
    const [constraintArray, updateConstraints] = useState<Constraint[]>([constraintMockFile]);
    
    const addParameter = () => {

        const constraint = {
            parameter: parametersArray.length,
            select: "  double chocolate",
            value: "" 
        }

        const newConstraints = [...constraintArray, constraint];

        updateConstraints(newConstraints);

        const newPara = {
            name: "",
            constraints: [constraint]
        };

        const newParameters = [...parametersArray, newPara];

        updateParameters(newParameters);
    }

    const removeParameter = (index: number) => {
        const newParameters = parametersArray.filter((_, arrayIndex) => arrayIndex !== index);
        const newConstraints = constraintArray.filter((c) => c.parameter !== index);


        newConstraints.forEach(element => {
            if(element.parameter > index) {
                element.parameter--;
            }
        });

        updateParameters(newParameters);
        updateConstraints(newConstraints);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;        
        const array = [...parametersArray];
        array[index].name = value;
        array.forEach(element => {
            console.log(element.name);
        });
        updateParameters(array);
    }

    const addConstraint = (pindex: number) => {
        const newConstraint = {
            parameter: pindex,
            select: "  double chocolate",
            value: "",
        }
        
        const newConstraints = [...constraintArray, newConstraint];

        updateConstraints(newConstraints);
        
        const temp = parametersArray;
        temp[pindex].constraints.push(newConstraint);
        updateParameters(temp);
    }

    const removeConstraint = (index: number) => {
        const newFileTypes = constraintArray.filter((_, arrayIndex) => arrayIndex !== index);

        updateConstraints(newFileTypes);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const value = e.target.value;
        const array = [...constraintArray];
        array[index].select = value;
        updateConstraints(array);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const array = [...constraintArray];
        array[index].value = value;
        updateConstraints(array);
    }

    return(
        <div>
            <div className="parameters-pop-up">
                <div className="submit-section">
                    <button className="save-button">Save</button>
                    <h1 className="title-Popup">Add new parameter</h1>
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
                                {constraintArray.map((c, index) => {
                                    if(c.parameter == pindex){
                                        return(
                                        <div key={ `${c.select}-${index}`} className="select-section">
                                            <select value={c.select} className="parameter-select" onChange={e => handleSelectChange(e, index)}>
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
                                    }
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
    ); 
}

export default ParameterPopUp;