import * as React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
        }
    }

    componentWillMount() {
        let token = sessionStorage.getItem('jwtToken');
        let userId = jwt.decode(token)._id;
        console.log(userId);
        if(userId) {
            axios.get(`/profile/${userId}`)
            .then((response) => {
                let userData = response.data.userData;
                this.setState({
                    user: userData,
                });
            })
            .catch((error) => {
                console.log("Error getting user data");
            }); 
        } 
    }

    render() {
        return (
            <div>
                <h2>{this.state.user.email}</h2>
            </div>                
            )
        }
    }


export default Profile;