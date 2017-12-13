import * as React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import axios from 'axios';

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasResetPassword: false,
            passwordResetEmail: false,
            isReset: false
        }
        this.handlePasswordResetChange = this.handlePasswordResetChange.bind(this);
        this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
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
                    hasResetPassword: true,
                    isReset: true
                });
            }
        }).catch((error) => {
            this.setState({
                hasResetPassword: false
            })
        })
    }

    render() {
        return (
            <div className="row">
                <h1>Reset your Password</h1>
                <div className="col-md-4 col-md-offset-4">
                    <p>Please fill provide your email address below and we will send you a temporary password
                        to access your account</p>
                        <form onSubmit={this.handleSubmitPasswordReset}>
                            <FormControl    
                                id="formPasswordReset"
                                type="text"
                                label="Email Address"
                                placeholder="Email Address"
                                onChange={this.handlePasswordResetChange}
                            />
                            <Button 
                                className="btn btn-success login-btn pull-right"
                                block={true} 
                                bsSize="large"
                                type="submit"
                            >
                            Reset Password
                            </Button>
                        </form>
                        {this.state.isReset &&
                            <p className="alert alert-success">Please check your email for a password reset token</p>
                        }
                </div>
        </div>  
        )  
    }
}

export default PasswordReset;