import React from "react";
import details from 'shared/icons/details.svg';
import Flag from "./Flag/Flag";

interface Submission {
    user: string,
    documentName: string,
    type: string,
    format: string,
    date: Date,
    isFlaged: boolean
}

const SubmissionLine = (submission : Submission): JSX.Element => {
    return (
        <tr className={'line submission'}>
            <td><Flag flagged={submission.isFlaged} /></td>
            <td>{submission.user}</td>
            <td>{submission.documentName}</td>
            <td>{submission.type}</td>
            <td>{submission.format}</td>
            <td>{(submission.date).toLocaleDateString()}</td>
            <td><img
              className={ 'icon details' }
               src={ details }/></td>
        </tr>
    )
}


export default SubmissionLine;