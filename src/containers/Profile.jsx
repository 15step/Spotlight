import * as React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Profile = (props) => {
        let token = sessionStorage.getItem('jwtToken');
        let userId = jwt.decode(token)._id;
        console.log(userId);
        if(userId) {
            axios.get(`/profile/${userId}`)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });    
            return(
                <div>
                    This is user profile        
                </div>
            )    
        } else {
            return(
                <div>
                    Could not retrieve user data        
                </div>
            )    
        }
    }


export default Profile;