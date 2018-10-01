import React from "react";

const SearchForm = props => (

<div className="card card-header">
    <h3 className="card-title rounded-top"><strong><i className="fa fa-newspaper"></i> Search Parameters</strong></h3>
    <div className="card-block">
    <form className="form" id="input-form">
    <div className="form-group">
        <label htmlFor="userSearch">Search Term:</label>
        <input type="text" className="form-control" name="searchTerm" value={props.searchTerm} onChange={props.handleInputChange} placeholder="Enter Your Search Query"></input>
    </div>
    <div className="form-group">
        <label htmlFor="userStart">Start Year (Optional):</label>
        <input type="text" className="form-control" name="startYear" value={props.startYear} onChange={props.handleInputChange} placeholder="Choose a Starting Year"></input>
    </div>
    <div className="form-group">
        <label htmlFor="userEnd">End Year (Optional):</label>
        <input type="text" className="form-control" name="endYear" value={props.endYear} onChange={props.handleInputChange} placeholder="Choose an Ending Year"></input>
    </div>
    <button id="searchit" type="submit" className="btn btn-primary" onClick={props.handleFormSubmit}><i className="fa fa-search"></i> Search</button>
    </form>
    </div>
    </div>
);

export default SearchForm;