import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './user-forms.css';
import * as axios from 'axios';
import { Redirect } from 'react-router';

class Signup extends React.Component{
    
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            signupFail: false,
            fireRedirect: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);        
        this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);                
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = emailRegex.test(this.state.email);

        if(!validEmail) {
            this.setState({
                signupFail: true
            });
            return false;
        }
        else if(this.state.password.length < 8) {
            this.setState({
                signupFail: true
            });
            return false;
        }
        else if(this.state.password === this.state.passwordConfirmation) {
            return true;
        } else {
            this.setState({
                signupFail: true
            });
            return false;
        }
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

    handlePasswordConfChange(event) {
        this.setState({
            passwordConfirmation: event.currentTarget.value,
        });     
    }

    handleSubmit(event) {
        event.preventDefault();
        let isValidForm = this.validateForm();
        if(isValidForm) {
            axios.post('/signup', {
                username: this.state.email,
                password: this.state.password
            }).then((response) => {
                this.setState({
                    fireRedirect: true
                });
            });
            
        }      
    }
    
    render() {
        const { from } = this.props.location.state || '/';        
        const { signupFail } = this.state;  
        const { fireRedirect } = this.state;      
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
                                    onChange={this.handleEmailChange}
                                />
                                <ControlLabel>Password</ControlLabel>
                                <FormControl    
                                    id="formControlPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    onChange={this.handlePasswordChange}
                                />
                                <ControlLabel>Password Confirmation</ControlLabel>
                                <FormControl    
                                    id="formControlPasswordConfirmation"
                                    type="password"
                                    label="Password Confiormation"
                                    placeholder="Password Confirmation"
                                    onChange={this.handlePasswordConfChange}
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
                {signupFail &&
                    <p className="alert alert-danger">Sorry your info was not valid.  Please make sure that 
                    you are providing a valid email address, that your passwords match and that your password is atleast.
                    8 characters</p>
                }
                {fireRedirect && 
                    <Redirect to={from || "/login"} />                                                    
                }
            </div>
        );
    }
}

export default Signup;