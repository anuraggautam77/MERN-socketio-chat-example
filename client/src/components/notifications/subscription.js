import React, { Component } from "react";
class Subscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: window.localStorage.getItem("userid"),
            coupon: {
                text: 'Subscribe',
                status: 'sub'
            },
            promotion: {
                text: 'Subscribe',
                status: 'sub'
            }

        };
        this.editPost = this.subscriptionpost.bind(this);

    }

    componentDidMount() {
        fetch('/api/subnotification/' + this.state.userid, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        }) .then(res => res.json())
                .then(json => {
                     var copflag=false,promotion=false ,objcoupontype=null,objpromotion=null;
                    if (json.hasOwnProperty('list')) {
                        if (json.list.promotion !== null && json.list.promotion === 'sub') {
                            promotion=true;
                            objpromotion = {
                                text: 'Unsubscribe',
                                status: 'un'
                            };
                        }
                        if (json.list.coupontype !== null && json.list.coupontype === 'sub') {
                             copflag=true;
                             objcoupontype = {
                                text: 'Unsubscribe',
                                status: 'un'
                            };
                        }
                     
                        if(copflag && promotion){
                             this.setState({promotion: objpromotion,coupon:objcoupontype});
                        }else if(!copflag && promotion){
                              this.setState({promotion: objpromotion});
                        }else if(copflag && !promotion){
                             this.setState({coupon:objcoupontype});
                        }
                        
                   }
                });

    }

    subscriptionpost(type, flag) {

        fetch('/api/savefcm', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: window.localStorage.getItem('deviceToken'),
                subtype: type,
                status: flag,
                userId: this.state.userid
            })
        })
                .then(res => res.json())
                .then(json => {
                    if (json.status == '200') {
                        var obj = {};
                        if (type === 'C') {

                            var coupon = {
                                text: 'Subscribe',
                                status: 'sub'
                            };
                            if (flag === 'sub') {
                                coupon.text = "Unsubscribe";
                                coupon.status = "un";
                            }

                            this.setState({coupon: coupon});

                        } else {
                            var promotion = {
                                text: 'Subscribe',
                                status: 'sub'
                            };

                            if (flag === 'sub') {
                                promotion.text = "Unsubscribe";
                                promotion.status = "un";
                            }
                            this.setState({promotion: promotion});
                        }
                    }
                })

    }

    render() {
        return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h5><b>Sub/Unsubscribe Notification</b> </h5>
                    </div>
                    <div className="well-sm friendlist">
                        <p>
                            <button  className="btn btn-primary btn-sm" onClick={(e) => {
                        this.subscriptionpost('C', this.state.coupon.status) }} >
                                {`${this.state.coupon.text} for Coupons`} 
                                &nbsp;<span className="glyphicon glyphicon-bell"> </span>
                            </button> 
                        </p>
                        <p>
                            <button onClick={(e) => {
                            this.subscriptionpost('P', this.state.promotion.status)  } }
                                    className="btn btn-primary btn-sm">{`${this.state.promotion.text} for Promotions`}
                                &nbsp; <span className="glyphicon glyphicon-bell"> </span>
                            </button> </p>
                    </div>
                </div>
                        );
    }
}

export default Subscription;



