import Peer from 'peerjs'
import EventEmitter2 from 'eventemitter2'
import QRCode from 'easyqrcodejs';
import {BaseController} from './BaseController'; 


export class SmartController extends EventEmitter2{

        constructor(peerid, firstConnected = true, controllerInterface = BaseController) {
            super();
            self = this;
            this.peerConnection = new Peer(peerid); 
            this.remotePeers = []; //list of connections
            this.controllerList ={};
            this.controllerObject = controllerInterface;
            this.firstConnected = firstConnected;
      
            this.peerConnection.on('open', function(id) {  //logs the browser peer id
                console.log('My peer ID is: ' + id);
                self.emit('open', "ready");
                
            });
      
            this.peerConnection.on("connection", this.peerOnConnection);  //opens the data connection between 2 peers once a connection is established
            
        }
            
          peerOnConnection = (conn) => {
            var playerID

            conn.on("data", function(data){  // fire an event everytime new data comes
                if (data.type == "user"){
                  var message = {'id' : conn.peer, 'data': data}  //send connection id + data received from phone/remote peer
                  self.emit('data', message);
                }

                else if(data.type =="setup"){
                  playerID = data.data.playerid 
                  console.log(playerID)

                  if (playerID != 'null'){  // user set a specific player id in qrcode, store playeyid as key not peerid
                    console.log(playerID in self.remotePeers)

                    if (playerID in self.remotePeers){  //if such player id already exists
                      if(self.firstConnected){ // defualt option, does not allow new connection to the same id
                        conn.send({type:'disconnect'})
                      }

                      else{ //firstConnected is false, disconnect the previous one and overwrite the playerid details
                        console.log('here')
                        var old_conn = self.remotePeers[playerID]
                        self.remotePeers[playerID] = conn;  //add to current connected peers 
                        self.controllerList[playerID] = new self.controllerObject(conn, playerID);
                        old_conn.send({type:'disconnect'})
                      }
                    }

                    else{  //if player id not yet in use make a new entry
                      self.remotePeers[playerID] = conn;  //add to current connected peers 
                      self.controllerList[playerID] = new self.controllerObject(conn, playerID);
                    }
                  }

                  else{ // user didnt set a specific player id in qrcode, store peerid as a key
                    self.remotePeers[conn.peer] = conn;  //add to current connected peers 
                    self.controllerList[conn.peer] = new self.controllerObject(conn);
                  }

                  self.emit('connection', conn); // fire an event on new connection
                  console.log(self.remotePeers)
                }
            });
      
            conn.on('close',function(){  //fire an event on disconnection and send a number of a player who disconnected 
                if (playerID !='null' && self.remotePeers[playerID].peer == conn.peer){
                  delete self.remotePeers[playerID];
                  delete self.controllerList[playerID];
                }
                else{
                  delete self.remotePeers[conn.peer];
                  delete self.controllerList[conn.peer];
                }
                self.emit('close', conn.peer);
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



  


  
  


