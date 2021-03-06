import React, {useState} from "react";
import newParameterIcon from "shared/icons/newParameter.svg";
import newParameter from "shared/icons/newParameter.svg";
import axios from "axios";
import "./ParametersPopUp.scss";
import Popup from "reactjs-popup";
import Trash from "shared/icons/delete.svg";
import addParameterIcon from "shared/icons/addparameter.svg";

interface FileType {
  _id: string;
  name: string;
  parameters: Parameter[];
}

interface Constraint {
  constraint: string;
  value: string;
}

interface Parameter {
  param: string;
  constraints: Constraint[];
}

const availableParams = [
  "Date of Publication",
  "Board of Directors",
  "Executive Management",
  "Profit (Text)",
  "Revenues (Text)",
  "Assets (Text)",
  "Total Assets",
  "Total Liabilities",
  "Gross Profit",
  "Profit",
  "Country",
  "Company Name",
  "Company Number",
  "Company Address",
  "Company Status",
  "Company Type",
  "Created On",
  "Date of Registration",
  "SIREN",
  "LEI",
  "CIB"
]

function ParameterPopUp(props: { file: FileType }): JSX.Element {
  const [fileType, updateFileType] = useState<string>(props.file.name);
  const [parametersArray, updateParameters] = useState<Parameter[]>(
    props.file.parameters ? props.file.parameters : []
  );

  const save = async () => {

    try {
    await axios
      .put(`/api/types/${props.file._id}`, {
        name: fileType,
        parameters: parametersArray,
      });

      location.reload();
    }catch(error) {
        console.error("Something went wrong!", error);
    }
  };

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.value;
    updateFileType(file);
  };

  const addParameter = () => {
    const newPara = {
      param: availableParams[0],
      constraints: [],
    };

    const newParameters = [...parametersArray, newPara];

    updateParameters(newParameters);
  };

  const removeParameter = (index: number) => {
    const newParameters = parametersArray.filter(
      (_, arrayIndex) => arrayIndex !== index
    );

    updateParameters(newParameters);
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const value = e.target.value;
    const array = [...parametersArray];
    array[index].param = value;
    updateParameters(array);
  };

  const addConstraint = (pindex: number) => {
    const newConstraint = {
      parameter: pindex,
      constraint: "lt",
      value: "",
    };

    const temp = [...parametersArray];
    temp[pindex].constraints.push(newConstraint);
    updateParameters(temp);
  };

  const removeConstraint = (index: number, pindex: number) => {
    const p = [...parametersArray];

    p[pindex].constraints = p[pindex].constraints.filter(
      (_, arrayIndex) => arrayIndex !== index
    );

    updateParameters(p);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    pindex: number
  ) => {
    const p = [...parametersArray];
    const value = e.target.value;
    p[pindex].constraints[index].constraint = value;

    updateParameters(p);
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    pindex: number
  ) => {
    const p = [...parametersArray];
    const value = e.target.value;
    p[pindex].constraints[index].value = value;

    updateParameters(p);
  };

  return (
    <Popup
      trigger={
        <button className="parameter-submit">
          <img src={addParameterIcon} className="add-parameter-image" />
        </button>
      }
      position="right center"
    >
      {() => (
        <div className="parameters-pop-up">
          <div className="submit-section">
            <input
              className="file-type"
              type="text"
              value={fileType}
              onChange={(e) => handleFileTypeChange(e)}
            />
            <button className="save" onClick={save}>
              Save
            </button>
          </div>

          <button className="new-parameter" onClick={addParameter}>
            <img src={newParameterIcon} className="icon new" />
            <div className="new-parameter-text">add new parameter</div>
          </button>

          {parametersArray.map((p, pindex) => {
            return (
              <div key={`${p}-${pindex}`} className="parameters">
                <p>Parameter name</p>
                <div>
                  <select value={p.param} onChange={(e) => handleNameChange(e, pindex)}>
                    <option value="" disabled>Select Parameter</option>
                    {availableParams.map(str => (<option key={str} value={str}>{str}</option>))}
                  </select>

                  <button onClick={() => removeParameter(Number(pindex))}>
                    <img src={Trash} className="icon trash" />
                  </button>
                </div>

                <div className="constraints">
                  <p>Constraints</p>
                  {p.constraints.map((c, index) => {
                    return (
                      <div
                        key={`${c.constraint}-${index}`}
                        className="select-section"
                      >
                        <select
                          value={c.constraint}
                          onChange={(e) => handleSelectChange(e, index, pindex)}
                        >
                          <option value="lt"> Less</option>
                          <option value="gt"> Greater </option>
                          <option value="lte"> Less or Equal </option>
                          <option value="gte"> Greater or Equal</option>
                          <option value="eq"> Equal </option>
                          <option value="oneOf"> One of </option>
                          <option value="contains"> Contains </option>
                          <option value="containsParam">
                            {" "}
                            Contains Parameter{" "}
                          </option>
                        </select>

                        <input
                          type="text"
                          value={c.value}
                          onChange={(e) => handleValueChange(e, index, pindex)}
                        />

                        <button onClick={() => removeConstraint(index, pindex)}>
                          <img src={Trash} className="icon trash" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => addConstraint(pindex)}
                    className="new-constraint"
                  >
                    <img src={newParameter} className="icon new" />
                    <div className="new-constraint-text">
                      add new constraint
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Popup>
  );
}

export default ParameterPopUp;
