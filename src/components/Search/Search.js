import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  // Setting initial state
  state = {
    searchTerm: "",
    startYear: "",
    endYear: ""
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

  // const { firstName, lastName} = this.state.
  // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
  alert(`Data ${this.state.searchTerm} ${this.state.startYear} ${this.state.endYear}`);

  // Put my ajax in here
  
  this.setState({
    searchTerm: "",
    startYear: "",
    endYear: ""
  });
};

render() {
  return (
    <div className="card card-header">
      <h3 className="card-title rounded-top"><strong><i className="fa fa-newspaper"></i> Search Parameters</strong></h3>
        <div className="card-block">
        <form className="form">
        <div className="form-group">
          <label htmlFor="userSearch">Search Term:</label>
          <input type="text" className="form-control" name="searchTerm" value={this.state.searchTerm} onChange={this.handleInputChange} placeholder="Enter Your Search Query"></input>
        </div>
        <div className="form-group">
          <label htmlFor="userStart">Start Year (Optional):</label>
          <input type="text" className="form-control" name="startYear" value={this.state.startYear} onChange={this.handleInputChange} placeholder="Choose a Starting Year"></input>
        </div>
        <div className="form-group">
          <label htmlFor="userEnd">End Year (Optional):</label>
          <input type="text" className="form-control" name="endYear" value={this.state.endYear} onChange={this.handleInputChange} placeholder="Choose an Ending Year"></input>
        </div>
        <button id="searchit" type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}><i className="fa fa-search"></i> Search</button>
        </form>
      </div>
      </div>
);
}
}
  
export default Search;