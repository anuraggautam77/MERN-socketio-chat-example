import React, { Component } from 'react';


export default class Home extends Component {

  constructor(props) {
    super (props);
    this.state = {
      books: []
    };
  }

  render() {
    return (
      <div>
        <main>
          <div className="main__container">
            <h1>Home</h1>
          </div>
        </main>
      </div>
      )
  }
}
