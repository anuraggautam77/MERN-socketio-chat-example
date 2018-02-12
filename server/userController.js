/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Cryptr = require ('cryptr');
const USER_ID_ENCRYPT_DECTYPT = 'user_id_incrption_decription';
module.exports = class UserController {

  getuserList(userdata) {
    let cryptr = new Cryptr (USER_ID_ENCRYPT_DECTYPT);
    let userList = [];
    userdata.forEach ((val, i) => {
      let  tempobj = {
        _id: cryptr.encrypt (val._id),
        email: val.email,
        lastName: val.lastName,
        firstName: val.firstName,
        city: val.city,
        country: val.country
      };
      userList.push (tempobj);
    });
    return userList;
  }

  getUserDetails(detail) {

    let cryptr = new Cryptr (USER_ID_ENCRYPT_DECTYPT);
    let userList = [];
    if (detail !== null & detail !== 'undefined') {
      detail.forEach ((val, i) => {
        let  tempobj = {
          userId: cryptr.encrypt (val.userId),
          photodata: val.photodata,
          isphoto: val.isphoto,
          sociallink: val.sociallink,
          professional: val.professional,
          aboutme: val.aboutme
        };
        userList.push (tempobj);
      });
    }
    return userList;
  }

};


