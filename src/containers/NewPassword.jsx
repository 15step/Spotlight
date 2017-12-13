import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './User-Forms.css';
import * as axios from 'axios';

class NewPassword extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            password: '',
            passwordConfirmation: '',
            validPassword: false,
            newPassword: false
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
                username: this.props.email,
                password: this.state.password
            }).then((response) => {
                this.setState({
                    validPassword: true
                });
            });
            
        }  
    }
    
    render() {
        const { from } = this.props.location.state || '/';        
        const { newPassword } = this.state;      
        const { validPassword } = this.state;
        return(
            <div className="container">
                <div className="row">
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
                                    Signup
                                </Button>
                            </form>
                    </div>
                </div>
                {validPassword &&
                    <p className="alert alert-danger"> Please make sure that your passwords match and that your
                     password is atleast 8 characters</p>
                }
                {newPassword &&
                    <p className="alert alert-succcess"> You have succesfully reset your password, please try loggin in</p>                   
                }
            </div>
        );
    }
}

export default NewPassword;