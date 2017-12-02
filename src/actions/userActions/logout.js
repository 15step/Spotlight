import * as React from 'react';

let logoutUser = () => {
    console.log("I got called for some reason");
    let userToken = sessionStorage.getItem('jwtToken');
    if(userToken) {
        sessionStorage.removeItem('jwtToken');
    }
}

export default logoutUser;