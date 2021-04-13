import React from "react";
import { ReactElement } from "react";
import details from '../shared/icons/details.svg';

interface Submission {
    name: string,
    type: string,
    format: string,
    state?: number,
    date: Date
}

function stateToClass(percentage: number | undefined) {
    if(!percentage) return "analysing";
    if(percentage < 0 || percentage > 100) throw new RangeError();
    if(percentage < 50) return "bad";
    if(percentage < 80) return "medium";

    return "good";

}

function stateToString(percentage: number | undefined) {
    if(!percentage) return "analysing";
    if(percentage < 0 || percentage > 100) throw new RangeError();

    return percentage + "%";

}

const submissionLineUser = (submission : Submission) : JSX.Element => {
    return (
        <tr className='line submission'>
            <td><span className={"icon status " +  stateToClass(submission.state)}/></td>
            <td>{stateToString(submission.state)}</td>
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