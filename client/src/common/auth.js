import PubSub from 'pubsub-js';

export class Auth {
  
  constructor()
  {
    this.validateToken = function (pathtorediect) {
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
         if(json.statuscode===403){
            PubSub.publish ('IS_LOGIN', {status: false, token: window.localStorage.getItem ('accessToken')});
            pathtorediect();
         }
      });

    };
    
    this.distroyedToken = function (pathtorediect) {
      fetch ('/api/invalidate', {
        method: 'post',
        body: JSON.stringify ({})
      }
      ).then (res => res.json ()).then (json => {
        console.log (json);
         if(json.statuscode===403){
            pathtorediect();
         }
      });

    }
    
    
  }
  
}