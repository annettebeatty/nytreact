import React from "react";
import "./Results.css";

const ResultsList = props => (
    <div className="card card-header">
        <h3 className="card-title rounded-top"><strong><i className="fa fa-table"></i> Results</strong></h3>
       <div className="card-body">
    {
        props.results.map(result => (
            <li className="list-group-item" key={result._id}>
            <a href={result.web_url} target="_blank">{result.headline.main}</a>
            </li>
        ))
    }
       </div>
    </div>
);
  
export default ResultsList;