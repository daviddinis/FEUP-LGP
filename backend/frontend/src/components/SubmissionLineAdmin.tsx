import React from "react";
import details from 'shared/icons/details.svg';
import Flag from "./Flag/Flag";
import {stateToClass, stateToString} from "./State/State";

interface Submission {
    user: string,
    isFlagged: boolean

    name: string,
    type: string,
    state?: number,
    date: Date,
}

const SubmissionLine = (submission : Submission): JSX.Element => {
    return (
        <tr className={'line submission'}>
            <td><Flag flagged={submission.isFlagged} /></td>
            {/* TODO: Add state
                <td><span className={"icon status " + stateToClass(submission.state)}/></td>
                <td>{stateToString(submission.state)}</td>
            */}
            <td>{submission.user}</td>
            <td>{submission.type}</td>
            <td>{(submission.date).toLocaleDateString()}</td>
            <td><img
              className={ 'icon details' }
               src={ details }/></td>
        </tr>
    )
}


export default SubmissionLine;