import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
class Mypost extends Component {

  constructor(props) {
    super (props);
    this.state = {
      content: '',
      title:'',
      tags:'',
      userid: window.localStorage.getItem ('userid'),
      flag:'s'
    };
    this.updateContent = this.updateContent.bind (this);
    this.onChange=this.onChange.bind(this);
    this.titlechange= this.titlechange.bind(this);
    this.tagchange= this.tagchange.bind(this);
    
     this.cancelPost=this.cancelPost.bind(this);
     this.submitPost=this.submitPost.bind(this);
    
  };
  
   submitPost() {
   
   if(this.state.content !=='' && this.state.title !==''){
      this.callNewUserApi(this.state);
   } 
  }
  
  
  callNewUserApi(data) {
    fetch ('/api/savepost', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify (data)})
      .then (res => res.json ())
      .then (json => {
       // this.serviceHandler (json);
        alert(json.message);
        
      });
  }
  
  
  
   cancelPost() {
   console.log(this.state);
  }
  
  
    updateContent(newContent) {
    this.setState ({
      content: newContent
    });
  }


  tagchange(e){
    this.setState ({
        tags: e
    });
  }

titlechange(e){
   this.setState ({
        title: e
    });
}


  onChange(evt) {
    var newContent = evt.editor.getData ();
    this.setState ({
      content: newContent
    });
    
  }

  onBlur(evt) {
   // console.log ("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
  //  console.log ("afterPaste event called with event info: ", evt);
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
                <input type="input" onChange={(e)=> { this.titlechange(e.target.value)} } className="form-control" placeholder="Title"/>
              </div>
              <div className="form-group">
                <label>Content</label>
                <CKEditor activeClass="p10" 
                          config={{language: 'en', toolbarCanCollapse: false}} 
                            content={this.state.content}
                            placeholder="Trying ..."
                             events={{"blur": this.onBlur,  "afterPaste": this.afterPaste,  "change": this.onChange}}
                          />
              </div>
              <div className="form-group">
                <label>Tags</label>
                <input type="input" onChange={(e)=> { this.tagchange(e.target.value)} } className="form-control" placeholder="Separate Tags with Comma "/>
              </div>
              <button type="button"  onClick={(e)=> { this.submitPost('save')} }  className="btn btn-success">Save</button>&nbsp;
              <button type="button"  onClick={(e)=> { this.cancelPost()} } className="btn">Cancel</button>
            </div>
          </div>
        );



        }
        ;
      }

    export default Mypost;
