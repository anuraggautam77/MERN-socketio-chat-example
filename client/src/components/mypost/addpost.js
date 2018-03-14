import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
class Mypost extends Component {

    constructor(props) {
        super(props);
         this.postId=''; let postEdit = false, savetxt="Save";
        
        if (props.match.params.hasOwnProperty('id')) {
            postEdit = true;
            this.postId = props.match.params.id;
            savetxt='Update';
        }
        this.state = {
            content: '',
            title: '',
            tags: '',
            userid: window.localStorage.getItem('userid'),
            flag: 's',
            edit: postEdit,
            savebutton:savetxt,
            postid:this.postId
        };
        this.updateContent = this.updateContent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.titlechange = this.titlechange.bind(this);
        this.tagchange = this.tagchange.bind(this);

        this.cancelPost = this.cancelPost.bind(this);
        this.submitPost = this.submitPost.bind(this);

    }

    componentWillMount() {
 
        if (this.state.edit) {
            fetch(`/api/getmyposts`, {
                  method: "post",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(
                         {userid: this.state.userid,  postid:this.postId }
                        )
                   }
            ).then(res => res.json()
            ).then(json => {
                  this.setDatainform(json.posts);
                
            });
        }

    }
    
    
    setDatainform(data){
        
        this.refs.posttitle.value=data[0].title;
        this.refs.tags.value=data[0].tags;
        
         this.setState({
            content: data[0].body
        });
        
    }
    

    submitPost() {
  
        if (this.state.content !== '' && this.refs.posttitle.value !== '') {
            this.callNewUserApi(this.state);
        }else{
            alert('Please fill Title and Content!! ')
        }
    }

    callNewUserApi(data) {
        
        fetch('/api/savepost', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
                .then(res => res.json())
                .then(json => {
                    alert(json.message);

                });
    }

    cancelPost() {
        console.log(this.state);
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        });
    }

    tagchange(e) {
        this.setState({
            tags: e
        });
    }

    titlechange(e) {
        this.setState({
            title: e
        });
    }

    onChange(evt) {
        var newContent = evt.editor.getData();
        this.setState({
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
                            <input type="input" ref="posttitle" onChange={(e) => { this.titlechange(e.target.value) } } className="form-control" placeholder="Title"/>
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <CKEditor ref='editor' activeClass="p10" 
                                      config={{language: 'en', toolbarCanCollapse: false}} 
                                      content={this.state.content}
                                      placeholder="Trying ..."
                                      events={{"blur": this.onBlur, "afterPaste": this.afterPaste, "change": this.onChange}}
                                      />
                        </div>
                        <div className="form-group">
                            <label>Tags</label>
                            <input type="input" ref="tags" onChange={(e) => { this.tagchange(e.target.value) } } className="form-control" placeholder="Separate Tags with Comma "/>
                        </div>
                       
                       
                        <button type="button"  onClick={(e) => { this.submitPost('save')  } }  className="btn btn-success">{this.state.savebutton}</button>&nbsp;
                       
                            
                            
                        <button type="button"  onClick={(e) => { this.cancelPost() } } className="btn">Cancel</button>
                    </div>
                </div>
                                        );



            }
            ;
        }

        export default Mypost;
