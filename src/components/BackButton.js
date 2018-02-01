import React from 'react';

const BackButton = (props) => {
    return (
        <button className="btn btn-primary" type="submit" onClick={props.prevCommittees}>Back</button>
    )
    
};

export default BackButton;

