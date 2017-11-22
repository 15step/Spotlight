import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './User-Forms.css';
import * as axios from 'axios';


class Signup extends React.Component{
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

    validateForm() {
        // TODO write code to validate farm
    }

    handleEmailChange(event){
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
        event.preventDefault();

        axios.post('/signup', {
            username: this.state.email,
            password: this.state.password
        }).then((response) => {
            console.log(response);
        });
    }
    
    render() {
        return(
            <div className="container user-form-group">
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
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