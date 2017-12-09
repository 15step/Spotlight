import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';

const PasswordReset = (props) => {
    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <p className="alert alert-danger">Incorrect username or password.</p> 
                <p>Please try again or enter the email address associated with your account below
                    to receive a temporary password.</p>
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