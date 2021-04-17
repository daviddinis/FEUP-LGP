import React from "react";
import details from 'shared/icons/details.svg';
import Flag from './Flag/Flag';
import flagSelected from 'shared/icons/flagSelected.svg';

interface Submission {
    user?: string,
    documentName: string,
    type: string,
    format: string,
    date: Date,
    isFlagged: boolean
}

const SubmissionLine = (submission : Submission): JSX.Element => {
    return (
        <tr className={'line submission'}>
            { submission.user &&
                <>
                    <td>
                        <Flag flagged={submission.isFlagged} />
                    </td>
                    <td>{submission.user}</td>
                </>
             }
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