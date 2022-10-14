import { Server as SocketServer } from "socket.io";
import { userJoin, userLeave, getRooms, getUsersInRoom, getCurrentUser, formatMessage } from "./utils/sockets.users.js";
import { readHistory, writeHistory, saveMessageToLog } from "./utils/database.js"; 

const socketServer = new SocketServer(app);

socketServer.on("connection", async (socket) => {
  
})