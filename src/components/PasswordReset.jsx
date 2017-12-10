import * as React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-bootstrap';

const PasswordReset = (props) => {
    return (
        <div className="row">
            <h1>Reset your Password</h1>
            <div className="col-md-4 col-md-offset-4">
            <p>Please fill provide your email address below and we will send you a temporary password
                to access your account</p>
                <form onSubmit={props.submitPasswordReset}>
                    <FormControl    
                        id="formPasswordReset"
                        type="text"
                        label="Email Address"
                        placeholder="Email Address"
                        onChange={props.handlePasswordResetChange}
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
                {props.isReset &&
                    <p className="alert alert-success">Please check your email for a password reset token</p>
                }
        </div>
    </div>

    )
}

export default PasswordReset;