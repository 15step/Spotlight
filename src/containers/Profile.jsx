import * as React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            hasUserData: false
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
                    hasUserData: true
                });
            })
            .catch((error) => {
                this.setState({
                    hasUserData: false
                })
            }); 
        } 
    }

    render() {
        const { hasUserData } = this.state;
        return (
            <div>
                {hasUserData
                    ? <h2>{this.state.user.email}</h2>
                    : <h2>Nope</h2>
                }
            </div>                
            )
        }
    }


export default Profile;