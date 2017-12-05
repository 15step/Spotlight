import * as React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const profileView = (response) => {
    if(response.status !== 200) {
        return (
            <p>There was an issue gathering your data</p>
        );
    }
    return(
        <ul>
            <li>This is a table for FCC things</li>
        </ul>
    )
} 

const Profile = (props) => {
    let token = sessionStorage.getItem('jwtToken');
    let userId = jwt.decode(token)._id;
    console.log(userId);
    if(userId) {
        axios.get(`/profile/${userId}`)
        .then((response) => {
            console.log(response);  
            let userData = response.data.userData;
            return(
                <div>
                    <h2>{userData.email}</h2>
                </div>
            )        
        }).catch((error) => {
            return(
                <div>
                    <p>Could not retrieve user data</p>
                </div>
            )    
        });    
    }
}


export default Profile;