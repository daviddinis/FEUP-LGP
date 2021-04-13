import React from "react";
import details from '../shared/icons/details.svg';

interface Submition {
    name: string,
    date: string,
    type: string,
    format: string,
    state?: number
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

const SubmitionLineUser = (submission : Submition) => {
    return (
        <tr className='line submition'>
            <td><span className={"icon status " +  stateToClass(submission.state)}/></td>
            <td>{stateToString(submission.state)}</td>
            <td>{submission.name}</td>
            <td>{submission.type}</td>
            <td>{submission.format}</td>
            <td>{submission.date}</td>
            <td><img
              className='icon details'
               src={ details }/></td>
        </tr>
    )
}


export default SubmitionLineUser;