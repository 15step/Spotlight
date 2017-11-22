import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './User-Forms.css';


class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/login').then((data) => {
            console.log('This is the response');
            console.log({
                name: 'Voyager 1',
                message: 'Hello from outside the solar system'
            });
        });
    }

    validateForm() {
        // TODO write code to validate farm
    }

    handleEmailChange(event) {
        this.setState({
            email: event.currentTarget.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.currentTarget.value,
        });     
    }

    handleSubmit(event) {
        // TODO.  Handle submission of data
        event.preventDefault();
    }

    render() {
        return(
            <div className="container user-form-group">
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                        <div className="login">
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
                                <Button 
                                    className="btn btn-primary login-btn pull-right"
                                    block={true} 
                                    bsSize="large"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;