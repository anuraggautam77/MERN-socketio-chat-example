import React, { Component } from "react";
import "../../style/css/mypost.scss";
import Comment from './postcomment';


class Listing extends Component {
  constructor(props) {
    super(props);
    let userId='';
    if(!props.hasOwnProperty('forall')){
      userId=window.localStorage.getItem("userid");
    } 
    this.state = {
      userid: userId,
      posts: [],
      commentShow:'dn'
    };
    this.showComments= this.showComments.bind(this); 
  }
  
  
   showComments(id){
      this.refs[`comment-${id}`].setAttribute('class','db');
   };
  
  
  
  
  
  componentDidMount() {
 
    fetch("/api/getmyposts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    }) .then(res => res.json()) .then(json => {
      this.setState({ posts: json.posts });
      });
  }

  postlitsing(posts) {
    let listItems = "";

    listItems = posts.map(obj => {
      return (
        <div className="well" key={obj._id}>
          <h4 className="media-heading">{obj.title}</h4>
            <hr />
           <p className="text-right"> By <span className="glyphicon glyphicon-user"></span>{` ${obj.user.fname} ${obj.user.lname}`}</p>
          <p dangerouslySetInnerHTML={{ __html: obj.body }} />
            
          <hr />
          <ul className="list-inline list-unstyled">
            <li>
              <span>
                <i className="glyphicon glyphicon-calendar" />
                {new Date(obj.date).toLocaleString("en-US", {
                  hour: "numeric",
                  day: "2-digit",
                  month: "numeric",
                  year: "numeric",
                  hour12: true,
                  minute: "numeric"
                })}{" "}
              </span>
            </li>
            <li>|</li>

            <span>
            <i className="glyphicon glyphicon-comment" /><a href="javascript:void(0)" onClick={
                   (e)=>{  this.showComments(obj._id); }  }> {obj.commentdata.length} comment(s)</a>
            
            </span>
           <li>|</li>
            <li>
              <span className="glyphicon glyphicon-tags">&nbsp;</span>
               Tags : {obj.tags}
            </li>
          </ul>
          <div className='dn' ref={`comment-${obj._id}`}> <Comment commentsdata={obj.commentdata} postid={obj._id} /> </div>
        </div>
      );
    });

    return listItems;
  }

  render() {
    return <div> {this.postlitsing(this.state.posts)} </div>;
  }
}

export default Listing;
