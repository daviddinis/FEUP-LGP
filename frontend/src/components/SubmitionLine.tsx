import React from "react";
import details from '../shared/icons/details.svg';
import flag from '../shared/icons/flag.svg';
import flagSelected from '../shared/icons/flagSelected.svg';

interface Submition {
    user: string,
    documentName: string,
    type: string,
    format: string,
    date: Date,
    isFlaged: boolean
}

const SubmitionLine = (submition : Submition) => {
    return (
        <tr className={'line submition'}>
            <td><img
              className={ 'icon flag' }
               src={ submition.isFlaged ? flagSelected : flag}/></td>
            <td>{submition.user}</td>
            <td>{submition.documentName}</td>
            <td>{submition.type}</td>
            <td>{submition.format}</td>
            <td>{(submition.date).toLocaleDateString()}</td>
            <td><img
              className={ 'icon details' }
               src={ details }/></td>
        </tr>
    )
}


export default SubmitionLine;