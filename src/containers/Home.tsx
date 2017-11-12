import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import * as fecActions from '../actions/campaignfinance';


export class Home extends React.Component {
    componentWillMount() {
        let foo: number[] = fecActions.getCampaignStuff();
        console.log(foo);
    }
    render() {
        return(
            <div>
                
            </div>
        );
    }
}
// export default Home;