import React from "react";
import { Card } from "reactstrap";
import "./styles/Search.css";

const Search = () => (
    <div className="card card-header">
      <h3 className="card-title rounded-top"><strong><i className="fa fa-newspaper"></i> Search Parameters</strong></h3>
        <div className="card-block">
        <form>
        <div className="form-group">
          <label for="userSearch">Search Term:</label>
          <input type="text" className="form-control" id="search-term" aria-describedby="emailHelp" placeholder="Enter Your Search Query"></input>
        </div>
        <div className="form-group">
          <label for="userStart">Start Year (Optional):</label>
          <input type="text" className="form-control" id="start-year" placeholder="Choose a Starting Year"></input>
        </div>
        <div className="form-group">
          <label for="userEnd">End Year (Optional):</label>
          <input type="text" className="form-control" id="end-year" placeholder="Choose an Ending Year"></input>
        </div>
        <button id="searchit" type="submit" className="btn btn-primary"><i class="fa fa-search"></i> Search</button>
        <button type="submit" className="btn btn-primary"><i class="fa fa-trash"></i> Clear Results</button>
        </form>
      </div>
      </div>
);
  
export default Search;