import React, { Component } from "react";

import "../../style/css/postlisting.scss";
class Preview extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userid: window.localStorage.getItem ('userid')
    };
   
  }
  ;
     
 

  render() {
    return (
      <div className="postlisting">
      
      <div className="panel panel-default panel-order">
  <div className="panel-heading">
  <strong>Posts</strong>
	  <div className="btn-group pull-right">
		  
		</div>
  </div>
  <div className="panel-body">
  		<div className="row">
		
			  <div className="col-md-12">
				<div className="row">
				  <div className="col-md-12">
					<div className="pull-right"><i className="fa fa-certificate"></i>  pending </div>
					<span><strong>The order name</strong></span> <span className="label label-info">group name</span><br/>
					Quantity : 2, cost: $323.13, <a href="#" data-toggle="modal" data-target="#orderModal"><small>See order detail</small></a>
				  </div>
				  <div className="col-md-12">
					order made on: 05/31/2014 by <a href="#">Jane Doe </a>
				  </div>
				</div>
			  </div>
			</div>
     
  </div>
  <div className="panel-footer">.</div>
</div>
      </div>
      
          
       
        );
        }
        ;
      }

    export default Preview;
