import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
class Mypost extends Component {

  constructor(props) {
    super (props);
    this.state = {
      content: 'anurag gautam',
      userid: window.localStorage.getItem ('userid')
    };
    this.updateContent = this.updateContent.bind (this);
  }
  ;
    updateContent(newContent) {
    this.setState ({
      content: newContent
    });
  }

  onChange(evt) {
    console.log ("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData ();
    this.setState ({
      content: newContent
    });
  }

  onBlur(evt) {
    console.log ("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log ("afterPaste event called with event info: ", evt);
  }

  render() {
    return (
     
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h3 className="panel-title pull-left">New Post</h3>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label>Post Title</label>
                <input type="input" className="form-control" placeholder="Title"/>
              </div>
              <div className="form-group">
                <label>Content</label>
                <CKEditor activeClass="p10"  content={this.state.content} config={{language: 'en', toolbarCanCollapse: false}} events={{"blur": this.onBlur, "afterPaste": this.afterPaste, "change": this.onChange}}
                          />
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

    export default Mypost;
