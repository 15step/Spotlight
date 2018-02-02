import * as React from 'react';
import axios from 'axios';
import Profile from '../components/Profile';
import { getUserId, getUserData } from '../utils/userUtils';

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }
    componentDidMount() {
        let userId = getUserId();
        if(userId) {
            getUserData(userId).then((user) => {
                if(user) {
                    this.setState({
                        user: user 
                    });            
                }
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