import * as React from 'react';
import SearchBox from '../components/SearchBox';
import './search-box.css';
import ContributorTable from './ContributorTable';
import axios from 'axios';

class SearchCommittees extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contributors: [],
            query: ''
        }
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleQueryChange(event) {
        this.setState({
            query: event.currentTarget.value
        });
    }
    
    handleSearch(event) {
        event.preventDefault();
        console.log(this.state.query);
        axios.get(`/search?committee=${this.state.query}`) 
        .then((response) => {
            let committees = response.data.results;
            console.log(committees.length);
            committees.forEach(committee => {
                console.log(committee.name);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div className="container contrib-search-box">
                <h2 className="search-box-header">Find a Committee</h2>
                <SearchBox searchContributors={this.handleSearch} handleQueryChange={this.handleQueryChange} contributors={this.contributors}/>
                {/* <ContributorTable /> */}
            </div>
        );
    }





}

export default SearchCommittees;