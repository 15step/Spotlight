import * as React from 'react';
import { Table } from 'react-bootstrap';

const Profile = (props) => {
    const user = props.user;
    return(
        <div className="container">
            <h2>{user.email}</h2>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Contributor</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[user.contributors].map((contributor, index) => {
                            return (
                                <td key={index}>{contributor.name}</td>
                            );
                        })}
                </tbody>
            </Table>                
        </div>      
    )
}

export default Profile;