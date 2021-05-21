import React from "react";
import details from 'shared/icons/details.svg';
import Flag from "components/Flag/Flag";
import {Link} from "react-router-dom";
import { stateToClass, stateToString } from "components/State/State";
import Submission from "models/Submission";

const SubmissionAdminLine = (submission : Submission): JSX.Element => {
    return (
        <tr className={'line submission'}>
            <td><Flag flagged={submission.user.isFlagged} userId={submission.user.id} /></td>
            <td>{submission.user.username}</td>
            <td><span className={"icon status " + stateToClass(submission.state)}/></td>
            <td>{stateToString(submission.state)}</td>
            <td>{submission.name}</td>
            <td>{submission.type}</td>
            <td>{(submission.date).toLocaleDateString()}</td>
            <td>
                <Link to={"/submissions/" + submission.id}>
                    <img className={ 'icon details' } src={ details }/>
                </Link>
            </td>
        </tr>
    )
}


export default SubmissionAdminLine;