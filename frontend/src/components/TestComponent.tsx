import React from 'react';

interface Props {
    requiredProp: number,
    optionalProp?: string,
}

/*
type Props = {
    requiredProp: number,
    optionalProp?: string,
}
*/

const component = (props : Props) => {
    return (
        <div>
            <span>{props.optionalProp}</span>
            {props.requiredProp}
        </div>
    )
}


export default component;