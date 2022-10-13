import React from "react";

interface Props {
    title: string;
    onClick: any;
}

const PrimaryButton: React.FC<Props> = ({title, onClick}) => {
    return <button className="primary-button" onClick={onClick} type="button">{title}</button>
}


export default PrimaryButton;
