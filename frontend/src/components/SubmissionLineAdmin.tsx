import React from "react";
import details from '../shared/icons/details.svg';
import flag from '../shared/icons/flag.svg';
import flagSelected from '../shared/icons/flagSelected.svg';

interface Submission {
    user: string,
    documentName: string,
    type: string,
    format: string,
    date: Date,
    isFlaged: boolean
}

const SubmissionLine = (submission : Submission) => {
    return (
        <tr className={'line submission'}>
            <td><img
              className={ 'icon flag' }
               src={ submission.isFlaged ? flagSelected : flag}/></td>
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