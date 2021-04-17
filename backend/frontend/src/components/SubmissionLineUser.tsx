import React from "react";
import details from 'shared/icons/details.svg';
import { stateToClass, stateToString } from "components/State/State";

interface Submission {
    name: string,
    type: string,
    format: string,
    state: number,
    date: Date
}

const submissionLineUser = (submission : Submission) : JSX.Element => {
    return (
        <tr className='line submission'>
            <td>
                <div className={ 'status-column' }>
                    <span className={"icon status " +  stateToClass(submission.state)}/> 
                    {stateToString(submission.state)}
                </div>
            </td>
            <td>{submission.name}</td>
            <td>{submission.type}</td>
            <td>{submission.format}</td>
            <td>{(submission.date).toLocaleDateString()}</td>
            <td><img
              className='icon details'
               src={ details }/></td>
        </tr>
    )
}


export default submissionLineUser;