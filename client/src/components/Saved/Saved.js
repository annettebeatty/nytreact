import React from "react";
import "./Saved.css";

const Saved = props => (
    <div className="container">
    <div className="card card-header">
        <h3 className="card-title rounded-top"><strong><i className="fa fa-table"></i> Saved</strong></h3>
       <div className="card-body">
       {
        props.saved.map(result => (
            <li className="list-group-item" key={result._id}>
            <h5><a href={result.url} target="_blank">{result.title}</a></h5>
            <h6>{result.date}</h6>
            <h6>{result.author}</h6>
            <button onClick={ () => props.handleDeleteClick(result._id) }>Delete</button>
            </li>
        ))
       }
       </div>
    </div>
    </div>
);
  
export default Saved;