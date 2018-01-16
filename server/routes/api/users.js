const Users = require ('../../models/User');
const DUPLICATE_CODE = 11000;

module.exports = (app) => {


  app.post ('/api/newuser', function (req, res) {
    const users = new Users (req.body);
    users.save ((err) => {
      if (err !== null) {
        if (err.code === DUPLICATE_CODE) {
          res.json ({statuscode: DUPLICATE_CODE, status: 'error', message: 'Email is already exist'});
        }
      }
    }).then (() => {
      res.json ({statuscode: '200', status: 'sucuess', message: 'Register Sucucessfully ', data: users});
    }).catch (() => {
      console.log ("asdsad");
    });


  });







};
