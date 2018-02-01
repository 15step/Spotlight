import React from 'react';

const ForwardButton = (props) => {
    return (
        <button className="btn btn-primary" type="submit" onClick={props.nextCommittees}>Forward</button>
    )
    
};

export default ForwardButton;

