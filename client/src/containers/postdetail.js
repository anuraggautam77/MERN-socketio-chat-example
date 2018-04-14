import React, { Component } from 'react';

import Detail from '../components/mypost/detail';
//import TitleListing from '../components/mypost/titlelisting';
class PostDetail extends Component {
    constructor(props) {
        super(props);
        let postId = '';
        if (props.match.params.hasOwnProperty('id')) {
            postId = props.match.params.id;

        }
        this.state = {
            currentuser: window.localStorage.getItem('userid'),
            postId: postId
        };

    }
    render() {
        return (
                <div className="main-landing row content">
                    {
                    (() => {
                        return (
                                <div>
                                    <div className="col-md-8 col-sm-8">
                                        <Detail postid={this.state.postId}/>
                                    </div>
                                    <div className="col-md-4 col-sm-12">

                                    </div>
                                </div>
                                );
                    })()
                    }
                </div>
                    );
    }
}
;

export default PostDetail;
