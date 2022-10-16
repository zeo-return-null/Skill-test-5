import {
  userJoin,
  userLeave,
  getRooms,
  getUsersInRoom,
  getCurrentUser,
  formatMessage,
} from "./utils/sockets.users.js";
import {
  readHistory,
  writeHistory,
  saveMessageToLog,
} from "./utils/database.js";

export default (io) => {
  io.on("connection", async (socket) => {
    const rooms = getRooms();

    io.emit("get:rooms", { rooms });

    socket.on("connect:room", async ({ user, room }) => {
      userJoin(socket.id, user, room);
      socket.join(room);

      const chatHistory = await readHistory();
      if (!chatHistory.hasOwnProperty(room)) {
        chatHistory[room] = [];
      }

      socket.emit("room:get-all-messages", chatHistory[room]);

      socket.emit(
        "room:message",
        formatMessage("Servidor: ", "Te has unido a la sala " + room)
      );

      socket.broadcast
        .to(room)
        .emit(
          "room:message",
          formatMessage(
            "Servidor: ",
            "Se ha unido a la sala el usuario " + user.name
          )
        );

      io.to(room).emit("room:users", { room, users: getUsersInRoom(room) });

      const rooms = getRooms();

      io.emit("get:rooms", { rooms });
    });

    socket.on("room:message", async (message) => {
      const user = getCurrentUser(socket.id);
      const formatedMessage = formatMessage(user.name, message);
      const chatHistory = await readHistory();

      if (!chatHistory.hasOwnProperty(user.room)) {
        chatHistory[user.room] = [];
      }

      chatHistory[user.room].push(formatedMessage);
      await writeHistory(chatHistory);
      await saveMessageToLog(formatedMessage);

      io.to(user.room).emit("room:message", formatedMessage);
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
          "room:message",
          formatMessage("Servidor: ", `El usuario ${user} se ha desconectado.`)
        );

        io.to(user.room).emit("room:users", {
          room: user.room,
          users: getUsersInRoom(user.rooms),
        });
      }
    });
  });
};
