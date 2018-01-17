import * as React from 'react';
import SearchBox from '../components/SearchBox';
import './search-box.css';
import ContributorTable from './ContributorTable';
import axios from 'axios';

class SearchContributors extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contributors: []
        }
        this.search = this.search.bind(this);
    }

    search(query) {
        console.log("reached search");
        axios.get('/search', {
            query: query
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        console.log("hello");
        return(
            <div className="container contrib-search-box">
                <h2 className="search-box-header">Find a Commitee</h2>
                <SearchBox searchContributors={this.search}/>
                {/* <ContributorTable /> */}
            </div>
        );
    }





}

export default SearchContributors;