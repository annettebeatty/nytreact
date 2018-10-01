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

  query = encodeURI(query);
  query += startYear + endYear;

  // API.search(query);
  axios.get(BASEURL + query)
    .then(res => this.setState({ results: res.data.response.docs.slice(0, 5) }))
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

  // Put my ajax in here
  this.searchArticles(this.state.searchTerm, this.state.startYear, this.state.endYear);

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

handleSaveClick = object => {
  // Save the data into Mongo
  console.log("Clicked to save ", object);

  API.saveNote(object)
  .then(res => this.loadArray())
  .catch(err => console.log(err));

  // Remove the saved element from the results array
  let hold = this.state.results;
  
  let found = hold.map(function(e) { return e._id; }).indexOf(object._id);
  hold.splice(found, 1);
  
  /*
  let found = this.state.results.find((element, i) => {
    if (element._id === object._id) {
      this.setState({ results: this.state.results.splice(i, 1)});
    }
  });
  */

}

handleDeleteClick = id => {
  // Save the data into Mongo
  console.log("Clicked to delete ", id);

  API.deleteNote(id)
  .then(res => this.loadArray())
  .catch(err => console.log(err));
}

renderPage1 = () => {
  if (this.state.results) {
    return <ResultsList 
      results={this.state.results}
      handleSaveClick={this.handleSaveClick}
    />;
  }

};

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