import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './User-Forms.css';
import * as axios from 'axios';
import { Redirect } from 'react-router';

class NewPassword extends React.Component{
    constructor(props) {
        console.log(props);
        super(props);
    
        this.state = {
            password: '',
            passwordConfirmation: '',
            invalidPassword: false,
            fireRedirect: false
        };
        
        this.handlePasswordChange = this.handlePasswordChange.bind(this);        
        this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);                
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        if(this.state.password.length < 8) {
            this.setState({
                validPassword: true
            });
            return false;
        }
        else if(this.state.password === this.state.passwordConfirmation) {
            return true;
        } else {
            this.setState({
                validPassword: true
            });
            return false;
        }
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
            axios.post('/new-password', {
                token: sessionStorage.getItem('jwtToken'),
                password: this.state.password
            }).then((response) => {
                if(response.status === 200) {
                    this.setState({
                        fireRedirect: true
                    });
                }
                else {
                    this.setState({
                        invalidPassword: true
                    });
                }
            });
            
        }  
    }
    
    render() {
        const { from } = this.props.location.state || '/';        
        const { fireRedirect } = this.state;      
        const { invalidPassword } = this.state;
        return(
            <div className="container">
                <div className="row">
                <h1>Please enter a new password</h1>
                    <div className="col-md-offset-3 col-md-6">
                            <form onSubmit={this.handleSubmit}>
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
                                    Reset
                                </Button>
                            </form>
                    </div>
                </div>
                {invalidPassword &&
                    <p className="alert alert-danger"> Please make sure that your passwords match and that your
                     password is atleast 8 characters</p>
                }
                {fireRedirect &&
                    <Redirect to={from || "/profile"} />
                }           
            </div>
        );
    }
}

export default NewPassword;