import React from 'react';
import AddPara from "components/ParametersPopUp/AddParameter";

function ParameterPopUp(): JSX.Element {


    return(
        <div>
            <div>
                <p>Add new parameter</p>

                <a>Save button</a>
            </div>
            <a>+ add new parameter</a>

            <div>
                <AddPara />
            </div>


        </div>
    );
}

export default ParameterPopUp;