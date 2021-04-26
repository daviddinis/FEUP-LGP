import React from "react";
import details from 'shared/icons/details.svg';
import { stateToClass, stateToString } from "components/State/State";
import {Link} from "react-router-dom";

interface Submission {
    id: string,
    name: string,
    type: string,
    state: number,
    date: Date
}

const submissionLineUser = (submission : Submission) : JSX.Element => {
    return (
        <tr className='line submission'>
            <td><span className={"icon status " +  stateToClass(submission.state)}/></td>
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


export default submissionLineUser;