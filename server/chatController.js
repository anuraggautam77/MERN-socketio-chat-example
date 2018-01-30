/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const socket_io = require ('socket.io');
const Chat = require ('./models/chat');
const mongoose = require ('mongoose');
const Cryptr = require ('cryptr');
const USER_ID_ENCRYPT_DECTYPT = 'user_id_incrption_decription';


let cryptr = new Cryptr (USER_ID_ENCRYPT_DECTYPT);

module.exports.socketio = (server) => {

  const io = socket_io (server);
  io.on ('connection', (socket) => {
    socket.on ('CHAT_TRIGGER', (data)=> {
      saveChatData (data, (arrList)=>{
            
           io.emit('RECEIVE_CHAT_HISTORY', getEncryptedData(arrList));
      });
    });

     socket.on ('CHAT_HISTORY', function (data) {
       getChatHistory(data,(arrList)=>{
          getEncryptedData(arrList)
          io.emit('RECEIVE_CHAT_HISTORY', getEncryptedData(arrList));
       });
      
    });
    
  });


  getEncryptedData= function(data){
    var arrTemp=[];
    data.map(function(obj){
     arrTemp.push(   {
         '_id':cryptr.encrypt (obj._id),
         'createdOn':obj.createdOn,
         'messagetext':obj.messagetext,
         'pingFrom':cryptr.encrypt (obj.pingFrom),
         'pingTO':cryptr.encrypt (obj.pingTO)
      });
    })
    return arrTemp;
  };



  saveChatData = function (data,callback) {
    let chat = new Chat ({
      pingFrom: cryptr.decrypt(data.pingFrom),
      chattitle1:cryptr.decrypt(data.pingFrom)+"----"+cryptr.decrypt(data.msgTo._id),
      chattitle2:cryptr.decrypt(data.msgTo._id)+"----"+cryptr.decrypt(data.pingFrom),
      pingTO: cryptr.decrypt(data.msgTo._id),
      messagetext: data.message,
      createdOn: data.time
    });
    chat.save().then ( function(){
       Chat.find({
     $or: [
         {
            chattitle1:cryptr.decrypt(data.pingFrom)+"----"+cryptr.decrypt(data.msgTo._id),
         },
         {
           chattitle1:cryptr.decrypt(data.msgTo._id)+"----"+cryptr.decrypt(data.pingFrom),
         }
      ]
   }, (error, chatlist) => {
         callback(chatlist);
  });
   

      
    });
  };

 getChatHistory= function (data,callback){
   
   Chat.find({
     $or: [
         {
           chattitle1: cryptr.decrypt(data.myDetail)+"----"+cryptr.decrypt(data.toDetail[0]._id)
         },
         {
           chattitle1:cryptr.decrypt(data.toDetail[0]._id)+"----"+cryptr.decrypt(data.myDetail)
         }
      ]
   }, (error, chatlist) => {
         callback(chatlist);
  });
   

 }



};
