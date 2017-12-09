import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './User-Forms.css';
import * as axios from 'axios';
import { Redirect } from 'react-router'
import PasswordReset from '../components/PasswordReset';

class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            fireRedirect: false,
            failedLogin: false,
            hasResetPassword: false,
            passwordResetEmail: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this); 
        this.handlePasswordResetChange = this.handlePasswordResetChange.bind(this);
        this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handlePasswordResetChange(event) {
        this.setState({
            passwordResetEmail: event.currentTarget.value
        })
    }

    handleSubmitPasswordReset(event) {
        event.preventDefault();
        
        axios.post('/password-reset', {
            email: this.state.passwordResetEmail
        }).then((response) => {
            if(response.status === 200) {
                this.setState({
                    fireRedirect: true,
                    hasResetPassword: true
                });
            }
        }).catch((error) => {
            this.setState({
                hasResetPassword: true
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('/login', {
            username: this.state.email,
            password: this.state.password,
            token: sessionStorage.getItem('token')
        }).then((response) => {
            if(response.status === 200) {
                sessionStorage.setItem('jwtToken', response.data.token);    
                this.setState({
                    fireRedirect: true  
                });         
            } 
        }).catch((error) => {
            this.setState({
                failedLogin: true
            });
        })
    }

    render() {
        const { from } = this.props.location.state || '/';
        const { fireRedirect } = this.state; 
        const { failedLogin } = this.state;
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
                                <Button 
                                    className="btn btn-primary login-btn pull-right"
                                    block={true} 
                                    bsSize="large"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </form>
                            {fireRedirect && (
                                <Redirect to={from || "/profile"} />
                            )}
                        </div>
                    </div>
                </div>
                {failedLogin
                    ? <PasswordReset handlePasswordResetChange={this.handlePasswordResetChange} 
                    submitPasswordReset={this.handleSubmitPasswordReset} isReset={this.state.hasResetPassword}/>
                    : <p></p>
                }
            </div>
        );
    }
}

export default Login;