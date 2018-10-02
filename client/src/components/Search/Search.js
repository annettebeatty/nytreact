import React, { Component } from "react";
import "./Search.css";
import ResultsList from "../Results/Results";
import SearchForm from "./SearchForm"
import Saved from "../Saved/Saved"
import API from "../utils/API"
import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=d0d8316ccccd4426b403229ab6762b11&page=0&q=";

class Search extends Component {
  // Setting initial state
  state = {
    searchTerm: "",
    startYear: "",
    endYear: "",
    results: [],
    saved: ""
  };

searchArticles = (query, startYear, endYear) => {
  // we need to make build start/end dates as optional
  if (startYear)
      startYear =  "&begin_date=" + startYear + "0101";
  else        
      startYear =  "&begin_date=20180101";

  if (endYear)
      endYear = "&end_date=" + endYear + "1231";
  else
      endYear =  "&end_date=20181231";

  // Code for spaces in URL and build the query for the NYT API including years
  query = encodeURI(query);
  query += startYear + endYear;

  // API.search(query);
  axios.get(BASEURL + query)
    .then(res => this.setState({ results: res.data.response.docs.slice(0, 5) }))
    .catch(function (error) {
      console.log(error);
    });
};

// This assigns the user inputs to the variables
handleInputChange = event => {
  // Getting the value and name of the input which triggered the change
  const { name, value } = event.target;

  // Updating the input's state
  this.setState({
    [name]: value
  });
};

// Process the completed form
handleFormSubmit = event => {
  event.preventDefault();

  // Call the function which calls the NYT API
  this.searchArticles(this.state.searchTerm, this.state.startYear, this.state.endYear);

  // Clear out the search parameters
  this.setState({
    searchTerm: "",
    startYear: "",
    endYear: ""
  });
};

// When this component mounts, load/clear array
componentDidMount() {
  this.loadArray();
}

// This function gets the saved articles
loadArray = () => { 
  API.getNote()
  .then(res => this.setState({ saved: res.data }))
  .catch(err => console.log(err));
}

// This processes when the user clicks an article to save
handleSaveClick = object => {

  console.log("Clicked to save ", object);

  // Save the data into Mongo
  API.saveNote(object)
  .then(res => this.loadArray())
  .catch(err => console.log(err));

  // Remove the saved element from the results array
  let hold = this.state.results;

  let found = hold.map(function(e) { return e._id; }).indexOf(object._id);
  hold.splice(found, 1);

  // Reset state of results array.  This will re-render results
  // section of the page without the saved article since it's
  // been "moved" to the saved section
  this.setState({ results: hold });
}

// Process a click for delete
handleDeleteClick = id => {
  // Remove the data from the Mongo database
  console.log("Clicked to delete ", id);

  API.deleteNote(id)
  .then(res => this.loadArray())
  .catch(err => console.log(err));
}

// This renders the Results section if they exist
renderPage1 = () => {
  if (this.state.results) {
    return <ResultsList 
      results={this.state.results}
      handleSaveClick={this.handleSaveClick}
    />;
  }
};

// This renders the Saved section if they exist
renderPage2 = () => {
  if (this.state.saved) {
    return <Saved 
      saved={this.state.saved}
      handleDeleteClick={this.handleDeleteClick}
    />; 
  }
};

render() {
  return (
    <div>
      <SearchForm
        searchTerm={this.state.searchTerm}
        startYear={this.state.startYear}
        endYear={this.state.endYear}
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
      />
      {this.renderPage1()}
      {this.renderPage2()}
    </div>
  );
}
}
  
export default Search;