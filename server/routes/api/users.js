const Users = require ('../../models/User');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');


const saltRounds = 10;
const SECRETKEY = 'iamnewinthistechstack';
const SECRETKEY_WRONG = 'wrongtoken';
const DUPLICATE_CODE = 11000;

module.exports = (apiRoutes) => {

  function tokenVerify(req, res) {
    var token = req.headers['x-access-token'];
    if (token) {
      jwt.verify (token, SECRETKEY, function (err, decoded) {
        if (decoded === undefined) {
          res.status (403).json ({
            message: 'No token provided',
            statuscode: 403
          });

        } else {
          res.status (200).json ({
            message: 'valid token'
          });
        }

      });
    } else {
      console.log ("Token Invalid");
      res.status (403).json ({
        message: 'No token provided',
        statuscode: 403
      });
    }
  }

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

          var token = jwt.sign ({data: "password"}, SECRETKEY, {
            expiresIn: '1h'
          });

          if (flag) {
            res.json ({status: "success", message: 'Login Successfully!!', accesstoken: token});
          } else {
            res.json ({status: "Error", message: 'Invalid Password!!!'});
          }
        });
      } else {
        res.json ({status: "Error", message: 'Invalid Username!!!'});
      }

    });

  });


  apiRoutes.post ('/authvalidate', function (req, res) {

    tokenVerify (req, res);

  });


  apiRoutes.post ('/invalidate', function (req, res) {

    jwt.sign ({data: "password"}, SECRETKEY, {
      expiresIn: '1'
    });


  });







};
