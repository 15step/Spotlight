import * as React from 'react';
import * as fecActions from '../actions/campaignfinance';


export class Home extends React.Component {
    componentDidMount() {
        let foo: number[] = fecActions.getCampaignStuff();
        console.log(foo);
    }
    render() {
        return(
            <div>
                This is coming from Home
            </div>
        );
    }
}
// export default Home;