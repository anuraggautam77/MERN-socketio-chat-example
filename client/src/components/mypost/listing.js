import React, { Component } from "react";
class Listing extends Component {

  constructor(props) {
    super (props);
    this.state = {
      userid: window.localStorage.getItem ('userid')
    };
  }
  ;
     

  render() {
    return (
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">Listing</h3>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label  >Post Title</label>
                <input type="input" className="form-control" placeholder="Title"/>
              </div>
              <div className="form-group">
                <label>Tags</label>
                <input type="input" className="form-control" placeholder="tags"/>
              </div>
              <button type="button" className="btn btn-primary">Publish</button> &nbsp;
              <button type="button" className="btn btn-secondary">Save</button>
      
            </div>
          </div>
       
        );
        }
        ;
      }

    export default Listing;
