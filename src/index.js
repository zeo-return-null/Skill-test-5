import express from "express";
import { createServer as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import morgan from "morgan";
import path from "path";
import * as url from "url";
import cors from "cors";
import sockets from "./sockets.server.js";
import { PORT } from "./config.js";

// Import routes
import mailRoute from "./routes/mail.routes.js";
import usersRoute from "./routes/users.routes.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Start express, http and socket server 
const app = express();
const httpServer = HttpServer(app);
const io = new SocketServer(httpServer);

// Set middlewares
app.use(cors());
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Set routes
app.use("/mail", mailRoute);
app.use("/users", usersRoute);

app.use("*", (req, res) => {
  res.redirect("/");
});

sockets(io);

httpServer.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
