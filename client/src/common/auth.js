export class Auth {

  constructor(pathtorediect)
  {
    this.validateToken = function (x, y) {
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
      });

    }
  }
  
}