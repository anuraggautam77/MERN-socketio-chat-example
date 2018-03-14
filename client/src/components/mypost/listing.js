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
            posts: []

        };

        this.editPost = this.editPost.bind(this);
        this.submitPost = this.submitPost.bind(this);


    }
    ;
    editPost(id) {
        this.props.history.push(`/posts/newpost/${id}`);
    }

    submitPost(flag, id) {


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
            return (
                    <div className="row" key={obj._id}>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                    
                                    <span><strong>{obj.title}</strong></span><br/>
                                    <div className="pull-right"><i className="fa fa-certificate"></i>
                                        <button type="button"  onClick={(e) => {
                            this.submitPost('PUB', obj._id)
                    } }  className="btn btn-success btn-xs">Publish</button> &nbsp;
                                        <button type="button"  onClick={(e) => {
                                this.editPost(obj._id)
                    }}  className="btn btn-primary btn-xs">Edit</button>
                                    </div>
                                </div>
                                <br/>                       
                    
                                <div className="col-md-12">
                                    Posted on: 
                                    {new Date(obj.date).toLocaleString("en-US", {
                                                    hour: "numeric",
                                                    day: "2-digit",
                                                    month: "numeric",
                                                    year: "numeric",
                                                    hour12: true,
                                    minute: "numeric"
                                    })}{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                                );
            });
            return listItems;
        }

        render() {
            return (
                    <div className="postlisting">
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
