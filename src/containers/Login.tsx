import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { FormEvent } from 'react';

interface Props {
    email: string;
    password: string;
}

interface State {}

class Login extends React.Component<Props, State> {
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

    handleEmailChange(event): void {
        this.setState({
            email: event.target.value,
        });
    }

    handlePasswordChange(event): void {
        this.setState({
            password: event.target.value,
        });     
    }

    handleSubmit(event): void {
        // TODO.  Handle submission of data
        event.preventDefault();
    }

    render() {
        return(
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus={true}
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block={true}
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;