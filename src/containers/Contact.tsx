import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';

interface Props {
    email: string;
    password: string;
}
interface State {
    value: '';
}    

class Contact extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e: React.FormEvent<HTMLFormElement>): void {
        this.setState({ value: e.currentTarget.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        // TODO.  Handle submission of data
        event.preventDefault();
    }

    render() {
        return(
            <div className="container login-form-group">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8">
                        <div className="login">
                            <form onSubmit={this.handleSubmit}>
                            <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    id="formControlName"
                                    type="text"
                                    label="Name"
                                    placeholder="Name"
                                />
                                <ControlLabel>Email Address</ControlLabel>
                                <FormControl
                                    id="formControlEmail"
                                    type="text"
                                    label="Email Address"
                                    placeholder="Email Address"
                                />
                                <ControlLabel>Message</ControlLabel>
                                <FormControl    
                                    id="formControlMessage"
                                    componentClass="textarea"
                                    style={{ height: 200 }}
                                    placeholder="Speak your mind!"
                                />
                                <Button 
                                    className="btn btn-primary login-btn pull-right"
                                    block={true} 
                                    bsSize="large"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
}
}

export default Contact;