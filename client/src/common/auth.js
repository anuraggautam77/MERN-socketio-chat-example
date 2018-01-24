import PubSub from 'pubsub-js';

export class Auth {

  constructor() {
    // 1 min =60000
    // 10 min=600000
    this.newTokenInmin = 60000;
    this.interval=null;

  }

  validateToken(pathtorediect) {
    fetch ('/api/authvalidate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem ('accessToken')
      },
      body: JSON.stringify ({})
    }
    ).then (res => res.json ()).then (json => {
      console.log (json);
      if (json.statuscode === 403) {
        PubSub.publish ('IS_LOGIN', {status: false, token: window.localStorage.getItem ('accessToken')});
        pathtorediect ();
      }
    });

  }
  ;
    distroyedToken(pathtorediect) {
    fetch ('/api/invalidate', {
      method: 'post',
      body: JSON.stringify ({})
    }
    ).then (res => res.json ()).then (json => {
      console.log (json);
      if (json.statuscode === 403) {
        pathtorediect ();
      }
    });

  }
  ;
    requestNewToken() {

    this.interval = setInterval (() => {
      fetch ('/api/newtoken', {
        method: 'post',
        body: JSON.stringify ({})
      }
      ).then (res => res.json ()).then (json => {
        console.log ("newToken>>>>>>>>>", json);
        window.localStorage.setItem ('accessToken', json.accesstoken);
      });
    }, this.newTokenInmin);

  };
  
  clearInterval(){
    
    clearInterval( this.interval);
    
  }
  

}