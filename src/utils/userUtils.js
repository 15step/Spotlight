import jwt from 'jsonwebtoken';
import axios from 'axios';

export function getUserId() {
    let token = sessionStorage.getItem('jwtToken');
    let userId;
    if(token !== null) {
        userId = jwt.decode(token)._id;
    } else {
        userId = null;
    }
    return userId;
}

export function getUserData(userId) {
    return (
        axios.get(`/profile/${userId}`)
            .then((response) => {
                let user = response.data.userData;
                return user;
            })
            .catch((error) => {
                return error;
            })
        );
}