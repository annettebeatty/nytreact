import React from "react";
import "./styles/Saved.css";

const Saved = () => (
    <div className="card card-header">
        <h3 className="card-title rounded-top"><strong><i className="fa fa-table"></i> Top Articles</strong></h3>
       <div class="card-body">
          <div id="temp" className="article"></div>
       </div>
    </div>
);
  
export default Saved;