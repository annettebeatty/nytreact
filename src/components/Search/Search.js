import React, { Component } from "react";
import "./Search.css";
import ResultsList from "../Results/Results";
import SearchForm from "./SearchForm"
import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

class Search extends Component {
  // Setting initial state
  state = {
    searchTerm: "",
    startYear: "",
    endYear: "",
    results: []
  };

searchArticles = (query, startYear, endYear) => {
  // we need to make build start/end dates as optional
  if (startYear)
  {
      startYear =  "&begin_date=" + startYear + "0101";
  }

  if (endYear)
  {
      endYear = "&end_date=" + endYear + "1231";
  }

  let queryURL =  '?&api-key=d0d8316ccccd4426b403229ab6762b11&q=' + query + "&page=0";
  queryURL += startYear + endYear;

  console.log("queryURL - ", queryURL);

  axios.get(BASEURL + queryURL)

  .then(res => this.setState({ results: res.data.response.docs }))
    .catch(function (error) {
      console.log(error);
    });
};

handleInputChange = event => {
  // Getting the value and name of the input which triggered the change
  const { name, value } = event.target;

  // Updating the input's state
  this.setState({
    [name]: value
  });
};

handleFormSubmit = event => {
  event.preventDefault();

  // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
  //alert(`Data ${this.state.searchTerm} ${this.state.startYear} ${this.state.endYear}`);

  // Put my ajax in here
  this.searchArticles(this.state.searchTerm, this.state.startYear, this.state.endYear);
  
  this.setState({
    searchTerm: "",
    startYear: "",
    endYear: "",
    results: []
  });
};

renderPage = () => {
  if (this.state.results) {
    return <ResultsList results={this.state.results}/>;
  }
};

render() {
  return (
    <div>
      <SearchForm
        search={this.state.search}
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
      />
      {this.renderPage()}
    </div>
  );
}
}
  
export default Search;