import * as React from 'react';
import SearchBox from '../components/SearchBox';
import './search-box.css';
import ContributorTable from './ContributorTable';
import axios from 'axios';

class SearchContributors extends React.Component {
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
        axios.get(`/search?contributor=${this.state.query}`) 
        .then((response) => {
            console.log(response);
            this.setState({
                contributors: ["data1", "data2"]
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div className="container contrib-search-box">
                <h2 className="search-box-header">Find a Contributor</h2>
                <SearchBox searchContributors={this.handleSearch} handleQueryChange={this.handleQueryChange} contributors={this.contributors}/>
                {/* <ContributorTable /> */}
            </div>
        );
    }





}

export default SearchContributors;