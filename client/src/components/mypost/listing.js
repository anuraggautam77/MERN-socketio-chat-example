import React, { Component } from "react";
import "../../style/css/postlisting.scss";
import {withRouter } from 'react-router-dom';

class Preview extends Component {

    constructor(props) {
        super(props);
        let userId = '';
        if (!props.hasOwnProperty('forall')) {
            userId = window.localStorage.getItem("userid");
        }
        this.state = {
            userid: userId,
            posts: [],
            isnotify: 'dn',
            alertmessage: ''

        };

        this.editPost = this.editPost.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.deletePost= this.deletePost.bind(this);

    };
    
    deletePost(id){
     let obj={ userid: this.state.userid,  postid:id };
       fetch('/api/deletemypost',
                     {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)}
              )
                .then(res => res.json())
                .then(json => { 
                        var updatedpost= this.state.posts.filter((e)=>{
                                             if(e._id!==id){ return e ;  }  
                         }); 
                    
                         this.setState({"alertmessage": json.message, posts: updatedpost, isnotify: 'alert alert-success bd'},()=>{
                                 this.resetErrorConatiner();
                          });   
                               
                 })
    } 
    
    editPost(id) {
        this.props.history.push(`/posts/newpost/${id}`);
    }

    submitPost(flag, id) {
       var obj = {
            userid: this.state.userid,
            flag: flag,
            postid:id
        };

          fetch('/api/savepost', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)})
                .then(res => res.json())
                .then(json => {
            
          
                var updatedpost= this.state.posts.filter((e)=>{
                                      if(e._id===id){ 
                                          e.flag=flag;
                                      } 
                              return e;
                         }); 
                    this.setState({ posts:updatedpost, "alertmessage": json.message});
        });
    };
    
     resetErrorConatiner(){
        setTimeout(()=>{
             this.setState({"alertmessage": '', isnotify: 'dn'});
        },3000);
    }
    
    

    componentDidMount() {

        fetch("/api/getmyposts", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(json => {

            this.setState({posts: json.posts});
        });
    }

    myPostLitsing(posts) {
        let listItems = "";
        listItems = posts.map(obj => {
            
         let status= 'Saved';
           if(obj.flag==='p'){
                status='Published'
            } 
            return (
                    <div className="row" key={obj._id}>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                  <strong>Title :  </strong><span>{obj.title}</span><br/>
                                </div>
                                <br/>                       
                                <div className="col-md-12">
                                 <div className="pull-left">
                                  <strong>Status:  </strong>{status}  &nbsp;&nbsp;
                                  <strong>  Posted on: </strong>  {new Date(obj.date).toLocaleString("en-US", {
                                                    hour: "numeric",
                                                    day: "2-digit",
                                                    month: "numeric",
                                                    year: "numeric",
                                                    hour12: true,
                                    minute: "numeric"
                                    })}{" "}
                                </div>  
             <div className="pull-right">
                 <button type="button"  onClick={(e) => {
                            if(obj.flag==='p'){
                              this.submitPost('s' , obj._id)
                         }else{
                               this.submitPost('p' , obj._id)
                         } 
                    } 
                     } 
                 className="btn btn-success btn-xs">
                   
                   { 
                      (()=>{
                        if(obj.flag==='p'){
                              return ("Un-publish");
                         }else{
                               return ("Publish");
                         } 
                      })()
                    }
                    
                   </button> &nbsp;
                 <button type="button"  onClick={(e) => { this.editPost(obj._id)  }}  className="btn btn-primary btn-xs">Edit</button>
                 &nbsp; <button type="button"  onClick={(e) => { this.deletePost(obj._id)  }}  className="btn btn-danger btn-xs">Delete</button>
              </div>
                                  
                                  
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                                );
            });
            return listItems;
        }


        render() {
            
          if(this.state.posts.length===0){
            
           return (  
                   <div className="alert alert-info">
                        <strong>No record found by you !!!!</strong>.
                    </div>
               )
           };
             
          return (
                    <div className="postlisting">
                       <div className={` ${this.state.isnotify} `}>
                          <strong>{this.state.alertmessage}</strong>
                        </div>
                    
                        <div className="panel panel-default panel-order">
                    
                            <div className="panel-body">
                                {this.myPostLitsing(this.state.posts)}
                            </div>
                    
                        </div>
                    </div>



                    );
        }
        ;
    }

    export default withRouter(Preview);
