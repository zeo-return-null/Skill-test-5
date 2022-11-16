import {
  userJoin,
  userLeave,
  getRooms,
  getRoomUsers,
  getCurrentUser,
  formatMessage,
} from "./utils/sockets.users.js";

import {
  readHistory,
  writeHistory,
  saveMessageToLog,
} from "./utils/database.js";

const server = "Aviso";

export default (io) => {
  io.on("connection", async (socket) => {
    const rooms = getRooms();

    io.emit("get:rooms", { rooms });

    socket.on("connect:room", async ({ user, room }) => {
      userJoin(user, socket.id, room);
      socket.join(room);
      const history = await readHistory();

      if (!history.hasOwnProperty(room)) {
        history[room] = [];
      }

      socket.emit("room:get-messages", history[room]);

      socket.emit(
        "room:message",
        formatMessage(server, `has entrado a la sala ${room}`)
      );

      socket.broadcast
        .to(room)
        .emit(
          "room:message",
          formatMessage(server, `${user.user} se unio a la sala`)
        );

      io.to(room).emit("room:users", {
        room,
        users: getRoomUsers(room),
      });

      const rooms = getRooms();

      io.emit("get:rooms", { rooms });
    });

    socket.on("room:send-message", async (message) => {
      const user = getCurrentUser(socket.id);
      const formatedMessage = formatMessage(user.user, message);
      const history = await readHistory();

      if (!history.hasOwnProperty(user.room)) {
        history[user.room] = [];
      }

      history[user.room].push(formatedMessage);

      await writeHistory(history);
      await saveMessageToLog(user.room, user.user, message);

      io.to(user.room).emit("room:message", formatedMessage);
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "room:message",
          formatMessage(server, `${user.user} se ha desconectado`)
        );

        io.to(user.room).emit("room:users", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};
