import React, { Component } from "react";
import "../../style/css/readmorepost.scss";
import _ from 'lodash';
import { NavLink, withRouter } from 'react-router-dom';
import Masonry from 'react-masonry-component';

import Comment from './postcomment';

const masonryOptions = {
    transitionDuration: 6
};
const imagesLoadedOptions = {background: '.my-bg-image-el'};


class ReadMorePost extends Component {
    constructor(props) {
        super(props);
        let userId = '', onlytext = false, isGrid = false;

        if (! props.hasOwnProperty('forall')) {
            userId = window.localStorage.getItem("userid");
        }
        if (props.hasOwnProperty('onlytext')) {
            onlytext = true;
        }

        if (props.hasOwnProperty('isGrid')) {
            isGrid = true;
        }
        this.state = {
            userid: userId,
            posts: [],
            commentShow: '',
            onlytext: onlytext,
            isGrid: isGrid

        };

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
    gridList(posts) {
        let listItems = "";

        listItems = posts.map(obj => {

            let linkurl = _.kebabCase(obj.title);
            return (
                    <div className="image-element-class col-sm-6 col-md-4"   key={obj._id}>
                        <div className="thumbnail">
                            {
                        (() => {
                            if (obj.img !== '') {
                                return(<img src={obj.img} style={{"width":"100%"}} alt=""/>)
                     }
                            })()
                            }
                            <div className="caption">
                                <strong> 
                                    <NavLink to={
                                `post/${obj._id}/${linkurl}`} className="post-title" >
                                        {obj.title}
                                    </NavLink>
                    
                                </strong>
                                <p dangerouslySetInnerHTML={{__html: _.truncate(_.trim(obj.body), {'length': 150 }) }} />
                                <br/>
                                <span className="glyphicon glyphicon-tags">&nbsp;</span> Tags : {obj.tags}
                            </div>
                    
                        </div>
                    </div>
                                    )
                })
                return listItems;
            }
            postlitsing(posts) {
                let listItems = "";

                listItems = posts.map(obj => {
                      let linkurl = _.kebabCase(obj.title);
                    return (
                            <div className="row"  key={obj._id}>
                                <div className="well bg-secondary col-md-12 post">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>
                                                <strong> 
                                                    <NavLink to={`post/${obj._id}/${linkurl}`} className="post-title" >
                                                        {obj.title}
                                                    </NavLink>
                                                </strong>
                                            </h4>
                                            <hr/>
                                        </div>
                            
                                    </div>
                                    <p className="text-right"> By <span className="glyphicon glyphicon-user"></span>{` ${obj.user.fname} ${obj.user.lname}`}</p>
                                    <div className="row post-content">
                            
                                        {
                                (() => {
                                    if (obj.img !== '') {
                                        return(
                                                                    <div className="row col-md-5 leftimage">
                                                                        <a href="#">
                                                                            <img src={obj.img} alt="" className="img-responsive"/>
                                                                        </a>
                                                                    </div>
                                                )

                                        }
                            
                                        })()
                            
                                        }
                            
                                        <p dangerouslySetInnerHTML={
                                        {__html: obj.body }} />
                                        <p>
                                        
                                         <NavLink to={`post/${obj._id}/${linkurl}`} className="btn btn-read-more" >
                                        Read more
                                        </NavLink>
                                        
                                       
                                        
                                        
                                        </p>
                            
                                    </div>
                                    <hr/>
                                    <div>
                                        <ul className="list-inline list-unstyled">
                                            <li><span>
                                                    <i className="glyphicon glyphicon-calendar"></i>
                                                    {new Date(obj.date).toLocaleString("en-US", {
                                                hour: "numeric",
                                                day: "2-digit",
                                                month: "numeric",
                                                                        year: "numeric",
                                                                        hour12: true,
                                                                        minute: "numeric"
                                                    })}{" "} </span>
                                            </li>
                                            <li>|</li>
                                            <li>
                                                <span>
                                                    <i className="glyphicon glyphicon-comment" />
                                                   
                                                    <NavLink to={ `post/${obj._id}/${linkurl}`} className="post-title" >
                                                      {obj.commentdata.length} comment(s)
                                                   </NavLink>
                                                    
                                                </span>
                                            </li> 
                                            <li> |</li>
                                            <li><span className="glyphicon glyphicon-tags">&nbsp;</span> Tags : {obj.tags}</li></ul>
                                    </div>
                            
                                </div>
                            </div>
                                            );
                        });

                        return listItems;
                    }
                    render() {


                        if (this.state.isGrid) {
                            return (
                                    <div> 
									
								 <Masonry
                        className={'my-gallery-class'} 
                        options={masonryOptions}  
                        updateOnEachImageLoad={false} 
                        imagesLoadedOptions={imagesLoadedOptions} 
                        >
                        { this.gridList(this.state.posts) }          
                    </Masonry>
									
									
									
									 
                                    </div>
                                    );
                        }
                        else {
                            return (
                                    <div className="readmore"> {
                                            this.postlitsing(this.state.posts)} 
                                    </div>
                                    );
                        }

                    }
                }

                export default ReadMorePost;




