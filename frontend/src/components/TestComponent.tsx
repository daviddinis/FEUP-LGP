import React from "react";

interface Props {
    requiredProp: number,
    optionalProp?: string,
}

const Component = (props : Props) => {

    return (
        <div>
            <span>{props.optionalProp}</span>
            {props.requiredProp}
        </div>
    )
}


export default Component;