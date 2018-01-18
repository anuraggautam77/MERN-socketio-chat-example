const Users = require ('../../models/User');

const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const saltRounds = 10;
const DUPLICATE_CODE = 11000;

module.exports = (apiRoutes) => {

  apiRoutes.post ('/newuser', function (req, res) {
    bcrypt.hash (req.body.password, saltRounds, function (err, hash) {
      req.body.password = hash;
      const users = new Users (req.body);
      users.save ((err) => {
        if (err !== null) {
          if (err.code === DUPLICATE_CODE) {
            res.json ({statuscode: DUPLICATE_CODE, status: 'error', message: 'Email is already exist'});
          }
        }
      }).then (() => {
        res.json ({statuscode: '200', status: 'success', message: 'Register Sucucessfully ', data: users});
      }).catch (() => {
        console.log ("asdsad");
      });

    });

  });



  apiRoutes.post ('/singin', function (req, res) {

    Users.find ({email: req.body.username}, function (err, userdata) {
      if (userdata.length > 0) {
        bcrypt.compare (req.body.loginpass, userdata[0].password, function (err, flag) {
          
          var token = jwt.sign ({data:"password"}, 'iamnewinthistechstack', {
               expiresIn: 1440  
          });

          if (flag) {
            res.json ({status: "success", message: 'Login Successfully!!', accesstoken:token});
          } else {
            res.json ({status: "Error", message: 'Invalid Password!!!'});
          }
        });
      } else {
        res.json ({status: "Error", message: 'Invalid Username!!!'});
      }

    });

  });













};
