class NetworkManager 
{
  static sock: SocketIOClient.Socket;  
  
  public static connect(ip: string, port: number, cb?: any, cb_err?: any)
  {
    if(!this.sock || !this.sock.connected)
      this.sock = io.connect(ip + ":" + port);
    else
      Sup.log("Socket already connected!");
    
    this.sock.on("connect", () => {
      Multiplayer.initMultiplayer();
      if(cb) cb(this.sock);
    });
    
    this.sock.on("connect_error", () => {
      if(cb_err) cb_err(this.sock);
    });
  }
  
  public static disconnect()
  {
    this.sock.disconnect();
  }
  
  public static socket()
  {
    return this.sock;
  }

  public static emit(event: string, ...args: any[]) {
    this.sock.emit(event, args);
  } 
}

class Room
{
  name : string;
  players : number;
  slots : number;
  id: string;
  
  static rooms : Array<Room> = new Array<Room>();
  
  constructor(name: string, players: number, slots: number, id: string)
  {
    this.name = name;
    this.players = players;
    this.slots = slots;
    this.id = id;
  }
}

namespace Multiplayer {
  export function initMultiplayer() {
    //ROOMS - Response to getRooms
    NetworkManager.sock.on("roomList", (data) => {
      for(let room of data) {
        Room.rooms.push(new Room(room.name, room.players, room.slots, room.id));
      }
      
      WidgetBuilder.buildLobbyWidget(0, 2, Room.rooms);
    });
    
    
    //OTHER
  }
  
  export function getRooms() {
    Sup.log("Getting rooms..");
    Room.rooms = new Array<Room>();
    NetworkManager.emit("getRooms");
  }
}