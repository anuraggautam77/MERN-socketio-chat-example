/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const socket_io = require ('socket.io');
const mongoose = require ('mongoose');
const Chat = require ('./models/chat');
const ChatType = require ('./models/Chattype');
const SocketSession = require ('./models/SocketSession');
const Cryptr = require ('cryptr');
const USER_ID_ENCRYPT_DECTYPT = 'user_id_incrption_decription';
const cryptr = new Cryptr (USER_ID_ENCRYPT_DECTYPT);


module.exports.socketio = (server) => {
  const io = socket_io (server);
  io.on ('connection', (socket) => {
    const user = socket;

    socket.on ('INIT_CONNECTION', (data) => {
      saveSessionId (data, user.id, function (str) { });
    });


    socket.on ('CHAT_HISTORY', function (data) {
      createChatGroup (data, (id) => {
      });

      getChatHistory (data, (arrList) => {
        user.emit ('RECEIVE_CHAT_HISTORY', {
          chattitle: data.myDetail + "----" + data.toDetail[0]._id,
          chatData: getEncryptedData (arrList)});
      });
    });


    socket.on ('CHAT_TRIGGER_INDIVIDUAL', (data) => {
      saveChatData (data, (arrList) => {
        let sendto = {one: cryptr.decrypt (data.msgTo._id)};
        user.emit ('RECEIVE_CHAT',
          {
            chattitle: data.pingFrom + "----" + data.msgTo._id,
            chatData: getEncryptedData (arrList),
          }
        );

        getAllSockets (sendto, (arrData) => {
          if (arrData.length > 0) {
            arrData.map (function (obj) {
              user.to (obj.socketId).emit ('RECEIVE_CHAT',
                {
                  chattitle: data.pingFrom + "----" + data.msgTo._id,
                  chatData: getEncryptedData (arrList)
                }
              );
            });
          }
        });
      });
    });
  });


  saveSessionId = function (data, id, callback) {
    let chat = new SocketSession ({
      userId: cryptr.decrypt (data.myid),
      socketId: id,
      expireOn: ""
    });
    chat.save ().then (() => {
      console.log (">>>> Save Session SocketID");
      callback ("done");
    });
  };




  getAllSockets = function (sendto, callback) {
    SocketSession.find (
      {
        userId: sendto.one
      }, (error, data) => {
      callback (data);
    });
  };

  getEncryptedData = function (data) {
    var arrTemp = [];
    data.map (function (obj) {
      arrTemp.push ({
        '_id': cryptr.encrypt (obj._id),
        'createdOn': obj.createdOn,
        'messagetext': obj.messagetext,
        'pingFrom': cryptr.encrypt (obj.pingFrom),
        'pingTO': cryptr.encrypt (obj.pingTO)
      });
    });
    return arrTemp;
  };



  saveChatData = function (data, callback) {
    let chat = new Chat ({
      pingFrom: cryptr.decrypt (data.pingFrom),
      chattitle: cryptr.decrypt (data.pingFrom) + "----" + cryptr.decrypt (data.msgTo._id),
      pingTO: cryptr.decrypt (data.msgTo._id),
      messagetext: data.message,
      createdOn: data.time
    });
    chat.save ().then (function () {
      Chat.find ({
        $or: [
          {
            chattitle: cryptr.decrypt (data.pingFrom) + "----" + cryptr.decrypt (data.msgTo._id)
          },
          {
            chattitle: cryptr.decrypt (data.msgTo._id) + "----" + cryptr.decrypt (data.pingFrom)
          }
        ]
      }, (error, chatlist) => {
        callback (chatlist);
      });
    });
  };

  getChatHistory = function (data, callback) {

    Chat.find ({
      $or: [
        {
          chattitle: cryptr.decrypt (data.myDetail) + "----" + cryptr.decrypt (data.toDetail[0]._id)
        },
        {
          chattitle: cryptr.decrypt (data.toDetail[0]._id) + "----" + cryptr.decrypt (data.myDetail)
        }
      ]
    }, (error, chatlist) => {
      callback (chatlist);
    });
  };

  createChatGroup = (data, callback) => {
    ChatType.find ({
      $or: [
        {
          chatinbetween: cryptr.decrypt (data.myDetail) + "----" + cryptr.decrypt (data.toDetail[0]._id)
        },
        {
          chatinbetween: cryptr.decrypt (data.toDetail[0]._id) + "----" + cryptr.decrypt (data.myDetail)
        }
      ]
    }, (error, record) => {

      if (record.length > 0) {
        console.log (">>>Already Exist >>>")
        callback (record[0]._id);
      } else {
        console.log (">>>Create New Exist >>>")
        new ChatType ({
          initiateby: cryptr.decrypt (data.myDetail) + "-with-" + cryptr.decrypt (data.toDetail[0]._id),
          chatinbetween: cryptr.decrypt (data.myDetail) + "----" + cryptr.decrypt (data.toDetail[0]._id),
          chatmember: [cryptr.decrypt (data.myDetail), cryptr.decrypt (data.toDetail[0]._id)]
        }).save ().then ((data) => {
          callback (data._id);
        });
      }
    });
  };

};
