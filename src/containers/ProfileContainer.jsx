import * as React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Profile from '../components/Profile';

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }
    componentWillMount() {
        let token = sessionStorage.getItem('jwtToken');
        let userId = jwt.decode(token)._id;
        console.log(userId);
        if(userId) {
            axios.get(`/profile/${userId}`)
            .then((response) => {
                let user = response.data.userData;
                this.setState({
                    user 
                });
            })
            .catch((error) => {
                console.log("Error getting user data");
            }); 
        } 
    }

    render() {
        const {user} = this.state;
        console.log(user);
        return (
                <div>
                    {user !== null &&
                        <Profile user={user} />
                    }
                </div>
            )
        }
    }


export default ProfileContainer;