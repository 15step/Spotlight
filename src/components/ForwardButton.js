import React from 'react';
import { Button } from 'react-bootstrap';

const ForwardButton = (props) => {
    return (
        <Button 
        className="btn btn-primary"
        block={true} 
        bsSize="small"
        type="submit"
        onClick={props.nextCommittees}
    >
        Forward
    </Button>    
    )
    
};

export default ForwardButton;

