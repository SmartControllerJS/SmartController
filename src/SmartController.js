import Peer from 'peerjs'
import EventEmitter2 from 'eventemitter2'
import QRCode from 'easyqrcodejs';
import {BaseController} from './BaseController'; 


export class SmartController extends EventEmitter2{

        constructor(peerid, controllerInterface = BaseController) {
            super();
            self = this;
            this.peerConnection = new Peer(peerid); 
            this.remotePeers = []; //list of connections
            this.controllerList ={};
            this.controllerObject = controllerInterface;
      
            this.peerConnection.on('open', function(id) {  //logs the browser peer id
                console.log('My peer ID is: ' + id);
                self.emit('open', "ready");
                
            });
      
            this.peerConnection.on("connection", this.peerOnConnection);  //opens the data connection between 2 peers once a connection is established
            
        }
            
          peerOnConnection = (conn) => {
            this.remotePeers[conn.peer] = conn;  //add to current connected peers 
            this.controllerList[conn.peer] = new this.controllerObject(conn);
            
            self.emit('connection', conn); // fire an event on new connection

            conn.on("data", function(data){  // fire an event everytime new data comes
                if (data.type == "user"){
                  var message = {'id' : conn.peer, 'data': data}  //send connection id + data received from phone/remote peer
                  self.emit('data', message);
                }
                else if(data.type =="setup"){
                  console.log(data.data)
                }
            });
      
            conn.on('close',function(){  //fire an event on disconnection and send a number of a player who disconnected 
                self.emit('close', conn.peer);
                delete self.remotePeers[conn.peer];
                delete self.controllerList[conn.peer];
            });
          }

          //create a QRcode from given url and display on screen on given canvas element (change to store the QRcode object and let the user display it whenever required)
          createQrCode = (url, elementID, width = 256, height = 256, playerID = null,) => {
            self.peerConnection.on("open" , function(id){
              var full_url =  url +"?id="+self.peerConnection.id + "&playerid="+ playerID
              console.log(full_url)

            var options = {
              text: full_url,
              width: width,
              height: height
            }

            new QRCode(document.getElementById(elementID), options);  
          })
         
      }

        //send message to a peer with given ID
        sendData = (peerID, data) => {
          self.remotePeers[peerID].send(data);
        }

    }



  


  
  


