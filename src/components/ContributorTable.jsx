import * as React from 'react';

const ContributorTable = (props) => {
    console.log(props);
    return(
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>FEC Filing</th>
                    </tr>
                </thead>
                <tbody>
                    {props.committees.map((committee, index) => {
                        return (
                            <tr key={index}>
                                <td>{committee.name}</td>
                                <td>{committee.address}</td>
                                <td>{committee.city}</td>
                                <td>{committee.state}</td>
                                <td>{committee.zip}</td>
                                <td><a href={committee.fec_uri} target="_blank">Link</a></td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
        </div>


    )
}

export default ContributorTable;