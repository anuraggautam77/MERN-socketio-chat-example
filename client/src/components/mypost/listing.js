import React, { Component } from "react";
class Listing extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    let userId='';
    if(!props.hasOwnProperty('forall')){
      userId=window.localStorage.getItem("userid");
    } 
    this.state = {
      userid: userId,
      posts: []
      
    };
  }
  componentDidMount() {
    fetch("/api/getmyposts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ posts: json.posts });
      });
  }

  postlitsing(posts) {
    let listItems = "";

    listItems = posts.map(obj => {
      return (
        <div className="well" key={obj._id}>
          <h4 className="media-heading">{obj.title}</h4>
          <p className="text-right">By :</p>
          <p dangerouslySetInnerHTML={{ __html: obj.body }} />
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
              <i className="glyphicon glyphicon-comment" /> 0 comments
            </span>
            {/*   <li>|</li>
            <li>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star-empty"></span>
            </li>
        <li>|</li> 
       */}
            <li>
              <span className="glyphicon glyphicon-tags">&nbsp;</span>
              Tags : {obj.tags}
            </li>
          </ul>
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
