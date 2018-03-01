const Users = require ('../../models/User');
const UsersDetails = require ('../../models/Userdetails');
const UserController = require ('../../userController');

const Posts = require ('../../models/Posts');
const bcrypt = require ('bcrypt');
const Cryptr = require ('cryptr');
const jwt = require ('jsonwebtoken');
const mongoose = require ('mongoose');
const path = require ('path');

const saltRounds = 10;
const SECRETKEY = 'iamnewinthistechstack';
const USER_ID_ENCRYPT_DECTYPT = 'user_id_incrption_decription';
const SECRETKEY_WRONG = 'wrongtoken';
const DUPLICATE_CODE = 11000;
const folderpath = path.resolve ("server/upload/images");


const SERVICE_CONST = {

  NEW_USER: "newuser",
  SIGN_IN: "singin",
  AUTH_VALIDATE: "authvalidate",
  NEW_TOKEN: "newtoken",
  GET_USER_LIST: "getuserlist",
  GET_USER_DETAIL: "getuserdetail",
  USER_UPDATE_DETAIL: "updateuserdetail",
  UPDATE_USER_DATA: 'updateuserdata',
  IMAGE_UPLOAD: 'uploads',
  SEND_REQUEST: 'sendrequest',
  ACCEPT_REQUEST: 'acceptrequest',
  ACCEPT_FRIEND_LIST: 'acceptfriendlist',

  SAVE_POST: 'savepost',
  GET_MY_POSTS:'getmyposts'

};

let cryptr = new Cryptr (USER_ID_ENCRYPT_DECTYPT);

module.exports = (apiRoutes) => {
  function getTokenHeader(req) {
    var token = req.headers['x-access-token'];
    return token;
  }

  function tokenVerify(req, res) {
    var token = getTokenHeader (req);
    if (token) {
      jwt.verify (token, SECRETKEY, function (err, decoded) {
        if (decoded === undefined) {
          console.log ('invalid or no token Provided');
        } else {
          console.log ('valid');
        }
      });
    } else {
      console.log ('invalid or no token Provided');
    }
  }


  function  generateNewToken() {
    var token = jwt.sign ({data: "password"}, SECRETKEY, {
      expiresIn: 7500 // 75 sec
    });
    return token;
  }

  apiRoutes.post (`/${SERVICE_CONST.IMAGE_UPLOAD}`, (req, res, next) => {
    let imageFile = req.files.file;
    imageFile.mv (`${folderpath}\\${req.body.filename}`, function (err) {
      if (err) {
        return res.status (500).send (err);
      }
      ;
      res.json ({file: "images/" + req.body.filename});
    });
  })

  apiRoutes.post (`/${SERVICE_CONST.NEW_USER}`, function (req, res) {

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
        users.update ({_id: users._id}, {'userId': users._id});
        res.json ({statuscode: '200', status: 'success', message: 'Register Sucucessfully '});


      }).catch ((err) => {
        console.log ("asdexcetion >>>>", err);
      });

    });

  });



  apiRoutes.post (`/${SERVICE_CONST.SIGN_IN}`, function (req, res) {

    Users.find ({email: req.body.username}, function (err, userdata) {

      if (userdata.length > 0) {
        bcrypt.compare (req.body.loginpass, userdata[0].password, function (err, flag) {

          var token = generateNewToken ();
          var encryptedString = cryptr.encrypt (userdata[0]._id);

          if (flag) {
            res.json ({status: "success", message: 'Login Successfully!!', accesstoken: token, userid: encryptedString});
          } else {
            res.json ({status: "Error", message: 'Invalid Password!!!'});
          }
        });
      } else {
        res.json ({status: "Error", message: 'Invalid Username!!!'});
      }

    });

  });



  apiRoutes.post (`/${SERVICE_CONST.AUTH_VALIDATE}`, function (req, res) {
    var token = getTokenHeader (req);
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
      res.status (403).json ({
        message: 'No token provided',
        statuscode: 403
      });
    }

  });

  apiRoutes.post (`/ ${SERVICE_CONST.NEW_TOKEN}`, (req, res) => {
    var headerToken = getTokenHeader (req);
    if (headerToken) {

      var token = generateNewToken ();
      if (flag) {
        res.json ({status: "success", message: 'Login Successfully!!', accesstoken: token});
      } else {
        res.json ({status: "Error", message: 'Invalid Password!!!'});
      }

    } else {
      console.log ("Token Invalid");
      res.status (403).json ({
        message: 'No token provided',
        statuscode: 403
      });
    }

  });

  apiRoutes.get (`/${SERVICE_CONST.GET_USER_LIST}/:id`, (req, res) => {
    if (req.params.id !== 'null') {
      let decryptedString = cryptr.decrypt (req.params.id);
      Users.find ({'_id': {$ne: decryptedString}}, (error, users) => {
        if (users.length > 0) {

          var contr = new UserController ();

          UsersDetails.find ({'userId': {$ne: decryptedString}}, (error, details) => {
            let list = contr.getuserList (users);
            let detail = contr.getUserDetails (details);
            list.forEach ((val, i) => {
              let id = val._id;
              detail.forEach ((dval, k) => {
                if (id === dval.userId) {
                  list[i]['userDetail'] = dval;
                }
                ;
              });
            });
            res.json ({status: "success", list: list});
          });

          //  res.json ({status: "success", list: contr.getuserList (users)});

        } else {
          res.json ({status: "success", message: "No record found!!!!"});
        }
      });
    } else {
      res.json ({status: "error", message: "Something goes wrong!!!!"});
    }
  });


  apiRoutes.get (`/${SERVICE_CONST.GET_USER_DETAIL}/:id`, (req, res) => {
    if (req.params.id !== 'null') {
      let decryptedString = cryptr.decrypt (req.params.id);

      Users.find ({'_id': decryptedString}, (error, users) => {
        if (users.length > 0) {
          var contr = new UserController ();
          UsersDetails.find ({'userId': users[0]._id}, (error, details) => {
            let list = contr.getuserList (users);
            let detail = contr.getUserDetails (details);
            list.forEach ((val, i) => {
              let id = val._id;
              detail.forEach ((dval, k) => {
                if (id === dval.userId) {
                  list[i]['userDetail'] = dval;
                }
                ;
              });
            });
            res.json ({status: "success", list: list});
          });

        } else {

          res.json ({status: "success", message: "No record found!!!!"});
        }
      });
    } else {
      res.json ({status: "error", message: "Something goes wrong!!!!"});
    }
  });


  apiRoutes.post (`/${SERVICE_CONST.USER_UPDATE_DETAIL}`, (req, res) => {

    UsersDetails.find ({
      'userId': cryptr.decrypt (req.body.userId)
    }, (error, data) => {
      if (data.length > 0) {
        console.log (req.body);
        var obj = {};
        if (req.body.hasOwnProperty ('imagedata')) {
          obj.photodata = req.body.imagedata;
          obj.isphoto = 'true'
        } else if (req.body.hasOwnProperty ('professional')) {
          obj.professional = req.body.professional;
        } else {
          obj.aboutme = req.body.aboutme;
        }

        UsersDetails.update (
          {'userId': cryptr.decrypt (req.body.userId)},
          obj, {}, (data) => {
          res.json ({status: "success", message: "Image Update Successfully!! !!!!"});
        });
      } else {

        var obj = {};
        if (req.body.hasOwnProperty ('imagedata')) {
          obj.photodata = req.body.imagedata;
          obj.isphoto = 'true'
        } else if (req.body.hasOwnProperty ('professional')) {
          obj.professional = req.body.professional;
        } else {
          obj.aboutme = req.body.aboutme;
        }
        obj.userId = cryptr.decrypt (req.body.userId);

        new UsersDetails (obj).save ().then (() => {
          res.json ({status: "success", message: "Image upload Successfully!! !!!!"});
        });
        ;

      }
    });

  });

  apiRoutes.post (`/${SERVICE_CONST.UPDATE_USER_DATA}`, (req, res) => {
    Users.find ({
      '_id': cryptr.decrypt (req.body.userId)
    }, (error, data) => {
      if (data.length > 0) {

        Users.update (
          {'_id': cryptr.decrypt (req.body.userId)},
          {
            firstName: req.body.formdata.firstName,
            lastName: req.body.formdata.lastName,
            city: req.body.formdata.city,
            country: req.body.formdata.country
          }, {}, (data) => {

          res.json ({status: "success", message: "Image Update Successfully!! !!!!"});
        });
      }
      ;
    });

  });


  apiRoutes.post (`/${SERVICE_CONST.SEND_REQUEST}`, (req, res) => {

    var queryOne = {'_id': cryptr.decrypt (req.body.requestedby)};
    Users.findOneAndUpdate (queryOne, {
      $push: {friends: {
          status: 'pending',
          ftype: 'SR',
          userid: cryptr.decrypt (req.body.requestedto)
        }}
    }, function (err, doc) {
      /** Push to another frind **/
      var query = {'_id': cryptr.decrypt (req.body.requestedto)};
      Users.findOneAndUpdate (query, {
        $push: {friends: {
            status: 'pending',
            ftype: 'RR',
            userid: cryptr.decrypt (req.body.requestedby)
          }}
      }, function (err, doc) {
        res.json ({status: "pending"});
      });
    });


  });


  apiRoutes.post (`/${SERVICE_CONST.ACCEPT_REQUEST}`, (req, res) => {

    var queryOne = {
      "_id": cryptr.decrypt (req.body.requestedby),
      "friends.userid": cryptr.decrypt (req.body.requestedto)
    };

    Users.findOneAndUpdate (queryOne, {$set: {"friends.$.status": 'ACCEPT'}},
      function (err, doc) {
        console.log (doc);
        /** Push to another frind **/
        var query = {
          "_id": cryptr.decrypt (req.body.requestedto),
          "friends.userid": cryptr.decrypt (req.body.requestedby)
        };

        Users.findOneAndUpdate (query, {$set: {"friends.$.status": 'ACCEPT'}},
          function (err, doc) {
            res.json ({status: doc});
          });
      });

  });


  apiRoutes.get (`/${SERVICE_CONST.ACCEPT_FRIEND_LIST}/:id`, (req, res) => {
    if (req.params.id !== 'null') {
      let decryptedString = cryptr.decrypt (req.params.id);

     
      Users.aggregate(  [ 
        { 
          $unwind: "$friends"
        },
        {
          $match:{ "$friends.status": "ACCEPT"}
        },
        {
        $project:{ "FriendUserID":"$friends.userid"}
        },
        { 
          $lookup:{  
             from:"Users",
             as: "FriendsUsers",
             localField: "FriendUserID",
             foreignField: "_id"
          }
        }
        /*,
        {
          $project: { FriendsUsers.lastName:1,FriendsUsers.firstName:1 }
        }*/
       ], (err,data)=>{
         console.log(err);
       }
    )
        
        
        
        
        
        
        /*Users.find ({'_id':decryptedString,"friends.status":'ACCEPT'}, (error, users) => {
       
       })*/

/*
      Users.find ({'_id': decryptedString, friends: {$elemMatch: {status: 'ACCEPT'}}}, (error, users) => {
        console.log (users);
      });

*/





      Users.find ({'_id': {$ne: decryptedString}}, (error, users) => {
        if (users.length > 0) {

          var contr = new UserController ();
          UsersDetails.find ({'userId': {$ne: decryptedString}}, (error, details) => {
            let list = contr.getuserList (users);
            let detail = contr.getUserDetails (details);
            list.forEach ((val, i) => {
              let id = val._id;
              detail.forEach ((dval, k) => {
                if (id === dval.userId) {
                  list[i]['userDetail'] = dval;
                }
                ;
              });
            });
            res.json ({status: "success", list: list});
          });

          //  res.json ({status: "success", list: contr.getuserList (users)});

        } else {
          res.json ({status: "success", message: "No record found!!!!"});
        }
      });
    } else {
      res.json ({status: "error", message: "Something goes wrong!!!!"});
    }
  });




  apiRoutes.post (`/${SERVICE_CONST.SAVE_POST}`, function (req, res) {
    let reqdata = req.body;
    let post = new Posts ({
      title: reqdata.title,
      body: reqdata.content,
      tags: reqdata.tags,
      _author: cryptr.decrypt (reqdata.userid)
    });
    post.save ().then (() => {
      console.log (">>>> Save Session SocketID");
     // callback ("done");
    });

  });

  apiRoutes.post (`/${SERVICE_CONST.GET_MY_POSTS}`, function (req, res) {
       let reqdata = req.body;
        let decryptedString = cryptr.decrypt (reqdata.userid);

       Posts.find ({'_author':decryptedString}, (error, posts) => {
         if (error){
           
         }
         res.json ({status: "Mil gaya data", posts: posts});
       }) 
 

  });




};
