import React, { Component } from "react";
import {NavLink, withRouter } from 'react-router-dom';

class Comment extends Component {

    constructor(props) {
        super(props);
       // console.log(props.commentsdata);
        this.state = {
            postby: window.localStorage.getItem("userid"),
            postid:'',
            comment:'',
            commentlist:props.commentsdata.length>0?props.commentsdata:[]
        };
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _handleKeyPress(e,postid) {
        this.setState({ postid:postid, comment:e.target.value});
        if (e.key === 'Enter') {
           this.callNewUserApi(this.state);
        }
    }

    callNewUserApi(state) {

        fetch('/api/savecomment', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(state)})
                .then(res => res.json())
                .then(json => {
                      console.log(json);
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
                                  <span className=" pull-right glyphicon glyphicon-user"> Anurag</span>
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
                        <div className="comment-wrap">
                            <div className="comment-block">
                   <textarea name="" onKeyPress={(e) => {
                        this._handleKeyPress(e,this.props.postid)
                }}  ref="commentinput" cols="30"  rows="2" placeholder="Add comment..."></textarea>
                            </div>
                        </div>
                        <div>
                        
                         {
                             this.commentDatalist (this.state.commentlist) 
                             
                          } 
                        
                            
                       </div>
                    </div>
                </div>
                    );
    }
    ;
}

export default withRouter(Comment);
