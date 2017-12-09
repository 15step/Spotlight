import * as React from 'react';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';

const PasswordReset = (props) => {
    console.log(props);
    return (
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <p className="alert alert-danger">Incorrect username or password. 
                    Please try again or reset your password</p> 
                <form onSubmit={props.submitPasswordReset}>
                <ControlLabel>Email Address</ControlLabel>
                    <FormControl    
                        id="formPasswordReset"
                        type="text"
                        label="Email Address"
                        placeholder=""
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