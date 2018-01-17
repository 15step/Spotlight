import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';
import './user-forms.css';
import * as axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            fireRedirect: false,
            fireResetRedirect: false,
            failedLogin: false,
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.currentTarget.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.currentTarget.value,
        });     
    }


    handleSubmit(event) {
        event.preventDefault();

        axios.post('/login', {
            username: this.state.email,
            password: this.state.password,
            token: sessionStorage.getItem('token')
        }).then((response) => {
            let responseData = response.data;
            if(response.status === 200 && responseData.resetPassword === true) {
                sessionStorage.setItem('jwtToken', response.data.token);
                this.setState({
                    fireResetRedirect: true
                });  
            } 
            else if(response.status === 200 && responseData.resetPassword === undefined) {
                sessionStorage.setItem('jwtToken', responseData.token);    
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
        const { fireResetRedirect } = this.state;
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
                            {fireRedirect && 
                                <Redirect to={from || "/profile"} />
                            }
                            {fireResetRedirect &&    
                                <Redirect to={from || "/new-password"} />
                            }
                        </div>
                    </div>
                </div>
                {failedLogin &&
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">            
                        <p className="alert alert-danger">Incorrect username or password.  Have you <Link to={"/password-reset"}>forgotten your password?</Link></p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Login;