import React, { Component } from 'react';
export default class Home extends Component {
  constructor(props) {
    super (props);
  }
  render() {
    return (
      <div>
        <main>
          <div className="main__container">
      
            <div className="row">
              <div className="col-md-4 col-sm-8 col-xs-12">aaa</div>
              <div className="col-md-8 col-sm-8 col-xs-12">
      
                <div className="row">
                  <div className="col-md-3 col-sm-4 col-xs-12">
                    <img src="http://placehold.it/200x200" alt="" className="img-rounded img-responsive" />
                    <p>
                      <i className="glyphicon glyphicon-envelope"></i>lorem@random.net
                      <br />
                      <i className="glyphicon glyphicon-globe"></i><a href="https://www.prepbootstrap.com">www.prepbootstrap.com</a>
                      <br />
                      <i className="glyphicon glyphicon-gift"></i>January 19, 1993
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        
 
        
        
      </div>
      )
  }
}
