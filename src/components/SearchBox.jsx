import * as React from 'react';
import './component-styles.css';
import { Button, FormControl } from 'react-bootstrap';

const SearchBox = (props) => {
    return(
        <div className="row">
            <div className="col-md-9">
                    <div>
                        <FormControl
                            id="formControlSearch"
                            type="text"
                            label="Contributor Search"
                            bsSize="lg"
                            placeholder="Search For..."
                        />
                    </div>
            </div>
            <div className="col-md-3">
                <Button 
                    className="btn btn-default"
                    block={true} 
                    bsSize="large"
                    type="submit"
                >
                    Search
                </Button>
            </div>
        </div>
    )
};


export default SearchBox;