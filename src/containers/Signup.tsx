import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './Signup.css';

interface Props {
    email: string;
    password: string;
}

interface State {}

class Signup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    
        this.state = {
            email: '',
            password: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm(): void {
        // TODO write code to validate farm
    }

    handleEmailChange(event: React.FormEvent<HTMLFormElement>): void {
        this.setState({
            email: event.currentTarget.value,
        });
    }

    handlePasswordChange(event: React.FormEvent<HTMLFormElement>): void {
        this.setState({
            password: event.currentTarget.value,
        });     
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        // TODO.  Handle submission of data
        event.preventDefault();
    }

    render() {
        return(
            <div className="container signup-form-group">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8">
                        <div className="signup">
                            <form onSubmit={this.handleSubmit}>
                                <ControlLabel>Email Address</ControlLabel>
                                <FormControl
                                    id="formControlEmail"
                                    type="text"
                                    label="Email Address"
                                    placeholder="Email Address"
                                />
                                <ControlLabel>Password</ControlLabel>
                                <FormControl    
                                    id="formControlPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                />
                                <ControlLabel>Password Confirmation</ControlLabel>
                                <FormControl    
                                    id="formControlPasswordConfirmation"
                                    type="password"
                                    label="Password Confiormation"
                                    placeholder="Password Confirmation"
                                />
                                <Button 
                                    className="btn btn-primary signup-btn pull-right"
                                    block={true} 
                                    bsSize="large"
                                    type="submit"
                                >
                                    Signup
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;