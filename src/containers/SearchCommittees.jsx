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
            numCommittees: 0
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
            if(response.status !== 200) {
                alert("Sorry we were not able to complete that search.")
            }
            else if(response.data.results.numCommittees === 0) {
                alert("Sorry we could not find any results! ");
                this.setState({
                    committees: [],
                    numCommittees: 0
                });
            }
            else {
                this.setState({
                    committees: response.data.results.committees,
                    numCommittees: response.data.results.numCommittees
                });    
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const { numCommittees } = this.state;
        return(
            <div>
                <div className="container contrib-search-box">
                    <h2 className="search-box-header">Find a Committee</h2>
                    <SearchBox searchCommittees={this.handleSearch} handleQueryChange={this.handleQueryChange} committees={this.committees}/>
                </div>
                {numCommittees !== 0 &&
                    <ContributorTable committees={this.state.committees} />
                }
            </div>
        );
    }
}

export default SearchCommittees;