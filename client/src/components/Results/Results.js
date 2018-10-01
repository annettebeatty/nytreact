import React from "react";
import "./Results.css";

function renderByline(result){
    if (result.byline) {
      return result.byline.original;
    }
    else   
      return "Not Specified";
};

const ResultsList = props => (
    <div className="container">
    <div className="card card-header">
        <h3 className="card-title rounded-top"><strong><i className="fa fa-table"></i> Results</strong></h3>
       <div className="card-body">
    {
        props.results.map(result => (
            <li className="list-group-item" key={result._id}>
            <h5><a href={result.web_url} target="_blank">{result.headline.main}</a></h5>
            <h6>{result.pub_date}</h6>
            <h6>{renderByline(result)}</h6>
            <button onClick={ () => props.handleSaveClick(result) }>Save</button>
            </li>
        ))
    }
       </div>
    </div>
    </div>
);
  
export default ResultsList;