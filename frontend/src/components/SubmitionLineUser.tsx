import React from "react";
import details from '../shared/icons/details.svg';

interface Submition {
    name: string,
    date: string,
    type: string
}

const SubmitionLineUser = (submission : Submition) => {
    return (
        <tr className={'line submition'}>
            <td><span className={ 'icon status' } /></td>
            <td>100%</td>
            <td>{submission.name}</td>
            <td>TODO</td>
            <td>{submission.type}</td>
            <td>{submission.date}</td>
            <td><img
              className={ 'icon details' }
               src={ details }/></td>
        </tr>
    )
}


export default SubmitionLineUser;