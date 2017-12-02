import * as React from 'react';
import axios from 'axios';

class Profile extends React.Component {


    componentWillMount() {
        let token = sessionStorage.getItem('jwtToken');
        console.log("From Profile!");
        if(token) {
            axios.get('/profile', {
                token: token
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });    
        }
    }

    render() {
        return(
            <div>
            This is the user's profile page.
        </div>
        )
    }
};

export default Profile;