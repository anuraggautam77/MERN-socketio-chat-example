import React, { Component } from "react";

class Chatlist extends Component {

  constructor(props) {
    super (props);
    this.state = {
      chatList: [],
      currentuser: window.localStorage.getItem ('userid')
    };

  }

  componentWillReceiveProps(newsprops) {
    this.setState ({
      chatList: newsprops.props
    });
  }

  meAndUrsTemplate(data) {
  
    if (data.pingFrom === this.state.currentuser) {
      return(
        <li key={data._id}>
          <div className="msj-rta macro">
            <div className="text text-r">
              <p>{data.messagetext}</p>
              <p><small>{new Date (data.createdOn).toLocaleString ('en-US', {hour: 'numeric', hour12: true, minute: 'numeric' } ) }</small></p>
            </div>
          </div>
        </li>

          );
      } else {
        return(
          <li key={data._id}>
            <div className="msj macro">
              <div className="text text-l">
                <p>{data.messagetext}</p>
                <p><small>{new Date (data.createdOn).toLocaleString ('en-US', {hour: 'numeric', hour12: true, minute: 'numeric' } ) }</small></p>
              </div>
            </div>
          </li>
            );
        }

      }
      ;
        render() {
        return (
          <div>
            { this.state.chatList.map (obj => {
                  {
                    return this.meAndUrsTemplate (obj)
            }
            })} 
          </div>
        )

        }
      }
      ;

      export default Chatlist;



                