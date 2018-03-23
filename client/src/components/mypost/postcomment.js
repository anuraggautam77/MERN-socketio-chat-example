import React, { Component } from "react";
import {NavLink, withRouter } from 'react-router-dom';

class Comment extends Component {

    constructor(props) {
        super(props);
       // console.log(props.commentsdata);
        this.state = {
            postby: window.localStorage.getItem("userid"),
            postid:'',
            comment:null,
            commentlist:props.commentsdata.length>0?props.commentsdata:[]
        };
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.submitPost = this.submitPost.bind(this);
        
    }

    _handleKeyPress(e,postid) {
        this.setState({ postid:postid, comment:e.target.value});
        
    };
    
    submitPost(){
        
        this.callNewUserApi(this.state); 
        this.refs.commentinput.value='';
        this.setState({comment:null}); 
        
       
       
    }
    
    

    callNewUserApi(state) {

        fetch('/api/savecomment', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(state)})
                .then(res => res.json())
                .then(json => {
                  this.setState({  commentlist: [...this.state.commentlist, json.commentdata] })  
                });
       }


    commentDatalist(list){
     
       let commentlist= list.map(obj =>{
                     return (
                            <div className="comment-wrap" key={obj._id}>
                             <div className="comment-block">
                                 <p className="comment-text "> {obj.comment}</p>
                                 <div className="bottom-comment">
                                 <div className="comment-date">
                                 <span className="glyphicon glyphicon-calendar">  </span>
                               {new Date(obj.date).toLocaleString("en-US", {
                                  hour: "numeric",
                                  day: "2-digit",
                                  month: "numeric",
                                  year: "numeric",
                                  hour12: true,
                                  minute: "numeric"
                                })}{" "}
                                 
                                 </div>
                                  <span className="pull-right glyphicon glyphicon-user">   </span>
                                 </div>
                             </div>
                            </div>
                        );
                                
         }); 
                            
        return commentlist;
    };




    render() {

        if (this.state.postby === null) {

            return (
                    <div className='text-center' >
                        <NavLink to='/login' className="button-style" >
                            Please Login first for Commenting
                        </NavLink>
                    </div>
                    )
        };

        return (
                <div className='mypost '>
                    <div className="comments">
                        <div>
                         {
                             this.commentDatalist (this.state.commentlist) 
                             
                          } 
                       </div>
                       <div className="comment-wrap">
                       <div className="comment-block">
                   <textarea  onChange={(e) => {
                        this._handleKeyPress(e,this.props.postid)
                }}  ref="commentinput" cols="30"  rows="2" placeholder="Add comment..."></textarea>
                 
                        <div className="pull-left">
                          {  (()=>{  
                                 if(this.state.comment!==null && this.state.comment.trim()!==''){
                                    return ( <button  onClick={(e) => { this.submitPost()  }}  type="button" className="btn btn-success btn-xs">Submit Comment</button>)
                                }   
                            })()
                          }
                      </div>

                
                
                </div>
                        </div>
                    </div>
                </div>
                    );
    }
    ;
}

export default withRouter(Comment);
