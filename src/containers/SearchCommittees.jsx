import * as React from 'react';
import SearchBox from '../components/SearchBox';
import './search-box.css';
import ContributorTable from '../components/ContributorTable';
import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';
import axios from 'axios';

class SearchCommittees extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            committees: [],
            query: '',
            numCommittees: 0,
            maxPages: 1,
            page: 1
        }
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleBackSearch = this.handleBackSearch.bind(this);
        this.handleForwardSearch = this.handleForwardSearch.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    loadData(page=1) {
        console.log("I was called");
        axios.get(`/search?committee=${this.state.query}&page=${page}`)
        .then((response) => {
            console.log(response);
            if(response.status !== 200) {
                alert("Sorry we were not able to complete that search.")
            }
            else if(response.data.results.numCommittees === 0) {
                alert("Sorry we could not find any results! ");
                this.setState({
                    committees: [],
                    numCommittees: 0,
                    maxPages: 1,
                    page: 1
                });
            }
            else {
                this.setState({
                    committees: response.data.results.committees,
                    numCommittees: response.data.results.numCommittees,
                    maxPages: response.data.results.pages,
                    page: page
                });    
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    handleQueryChange(event) {
        this.setState({
            query: event.currentTarget.value
        });
    }
    
    handleSearch(event) {
        event.preventDefault();
        this.loadData();
    }

    handleBackSearch() {
        if(this.state.page !== 1) {
            this.loadData(this.state.page-1);
        }
    }

    handleForwardSearch() {
        if(this.state.page !== this.state.maxPages && this.state.maxPages !== 1) {
            this.loadData(this.state.page+1);
        }
    }

    render() {
        const { numCommittees } = this.state;
        console.log(this.state);
        return(
            <div>
                <div className="container contrib-search-box">
                    <h2 className="search-box-header">Find a Committee</h2>
                    <SearchBox searchCommittees={this.handleSearch} handleQueryChange={this.handleQueryChange} committees={this.state.committees}/>
                </div>
                {numCommittees !== 0 &&
                    <div>
                        <ContributorTable committees={this.state.committees}  />
                        <BackButton prevCommittees={this.handleBackSearch} page={this.state.pages}/>
                        <ForwardButton nextCommittees={this.handleForwardSearch} page={this.state.pages} />
                        <p>{this.state.page} / {this.state.maxPages}</p>
                    </div>
                }
            </div>
        );
    }
}

export default SearchCommittees;