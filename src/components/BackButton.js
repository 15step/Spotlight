import React from 'react';
import { Button } from 'react-bootstrap';

const BackButton = (props) => {

    return (
        <Button 
        className="btn btn-default"
        block={true} 
        bsSize="small"
        type="submit"
        onClick={props.prevCommittees}
    >
        Back
    </Button>
)
    
};

export default BackButton;

