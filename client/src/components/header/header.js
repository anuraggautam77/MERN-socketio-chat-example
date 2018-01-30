import React, { Component } from "react";
import "../../style/css/header.scss";
class Header extends Component{

    render() {
        return (
            <div className="header-container">
                <div className="cardheader"></div>
                      <div className="avatar">
                          <img src="/img/avatars/1.jpg" alt="ImagePlace" title="image" />
                      </div>
                    <div className="info">
                        <div className="title">
                            <a target="_blank" href="">dsadasd</a>
                        </div>
                        <div className="desc">dsadsadsa</div>
                        <div className="desc">Ddsadasr at <b>dsad</b></div>
                    </div>
            </div>
           
        )
    };


}

export default Header;



                