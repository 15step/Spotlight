import * as React from 'react';
import SearchBox from '../components/SearchBox';
import './search-box.css';
import ContributorTable from '../components/ContributorTable';
import axios from 'axios';

class SearchCommittees extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            committees: [],
            query: '',
            num_committees: 0
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
        axios.get(`/search?committee=${this.state.query}`) 
        .then((response) => {
            this.setState({
                committees: response.data.results.committees,
                num_commitees: response.data.results.num_results
            });            
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div>
                <div className="container contrib-search-box">
                    <h2 className="search-box-header">Find a Committee</h2>
                    <SearchBox searchCommittees={this.handleSearch} handleQueryChange={this.handleQueryChange} committees={this.committees}/>
                </div>
                    <ContributorTable />
            </div>
        );
    }
}

export default SearchCommittees;