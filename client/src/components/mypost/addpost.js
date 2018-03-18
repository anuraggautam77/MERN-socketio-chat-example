import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
class Mypost extends Component {

    constructor(props) {
        super(props);
        this.postId = '';
        let postEdit = false, savetxt = "Save";

        if (props.match.params.hasOwnProperty('id')) {
            postEdit = true;
            this.postId = props.match.params.id;
            savetxt = 'Update';
        }
        this.state = {
            content: '',
            title: '',
            tags: '',
            userid: window.localStorage.getItem('userid'),
            flag: 's',
            edit: postEdit,
            savebutton: savetxt,
            postid: this.postId,
            isnotify: 'dn',
            alertmessage: ''
        };
        


        this.onChange = this.onChange.bind(this);
        this.titlechange = this.titlechange.bind(this);
        this.tagchange = this.tagchange.bind(this);

        this.cancelPost = this.cancelPost.bind(this);
        this.submitPost = this.submitPost.bind(this);

        this.onInstanceReady = this.onInstanceReady.bind(this);
    }

    setDatainform(data) {
        this.refs.posttitle.value = data[0].title;
        this.refs.tags.value = data[0].tags;
        this.setState({flag: data[0].flag});
    }

    onInstanceReady(evnt) {
        if (this.state.edit) {
            fetch(`/api/getmyposts`, {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                        {userid: this.state.userid, postid: this.postId}
                )
            }
            ).then(res => res.json()
            ).then(json => {
                this.setDatainform(json.posts);
                evnt.editor.setData(json.posts[0].body);
            });
        }

    }

    submitPost(flag) {

        if (this.state.content !== '' && this.refs.posttitle.value !== '') {

            var obj = {
                content: this.state.content,
                title: this.refs.posttitle.value,
                tags: this.refs.tags.value,
                userid: this.state.userid,
                flag: flag,
                postid: this.postId
            };

            this.callNewUserApi(obj);
        } else {
           
           this.setState({"alertmessage": 'Please fill Title and Content!!', isnotify: 'alert alert-danger bd'},()=>{
               this.resetErrorConatiner();
           });
            
        }
    }
    
    resetErrorConatiner(){
        setTimeout(()=>{
             this.setState({"alertmessage": '', isnotify: 'dn'});
        },3000);
        
    }
    
    

    callNewUserApi(data) {

        fetch('/api/savepost', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
                .then(res => res.json())
                .then(json => {
                        this.setState({"alertmessage": json.message, isnotify: 'alert alert-success bd'},()=>{
                            this.resetErrorConatiner();
                        });
                });
    }

    cancelPost() {

        this.refs.posttitle.value = '';
        this.refs.tags.value = '';
        this.refs.posttitle.value = '';
        this.refs.tags.value = '';
        if (this.state.edit) {

            this.props.history.push(`/posts/listing`);
        }


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
                <div>
                
                      <div className={` ${this.state.isnotify} `}>
                          <strong>{this.state.alertmessage}</strong>
                        </div>
                    <div className="panel panel-default">
                
                
                        <div className="panel-heading clearfix">
                            <h3 className="panel-title pull-left">New Post</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Post Title</label>
                                <input type="input" ref="posttitle" onChange={(e) => {
                        this.titlechange(e.target.value)
                 } } className="form-control" placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                
                                <CKEditor ref='editor' activeClass="p10" 
                                          config={{language: 'en', isScriptLoaded: true, toolbarCanCollapse: false}} 
                                          content={this.state.content}
                                          placeholder="Trying ..."
                                          events={
                            {
                                "blur": this.onBlur,
                                "afterPaste": this.afterPaste,
                                "change": this.onChange,
                                "instanceReady": this.onInstanceReady


                                          }}
                                          />
                            </div>
                            <div className="form-group">
                                <label>Tags</label>
                                <input type="input" ref="tags" onChange={(e) => {
                                    this.tagchange(e.target.value)
                 } } className="form-control" placeholder="Separate Tags with Comma "/>
                            </div>
                
                
                            <button type="button"  onClick={(e) => {
                                        this.submitPost('s')
                  } }  className="btn btn-success">{this.state.savebutton}</button>&nbsp;
                            <button type="button"  onClick={(e) => {
                                            this.submitPost('p')
                  } }  className="btn btn-primary">Publish</button>&nbsp;
                
                
                
                            <button type="button"  onClick={(e) => {
                                                this.cancelPost()
                 } } className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
                                            );



            }
            ;
        }

        export default Mypost;
