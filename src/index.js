import express from "express";
import { createServer as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import morgan from "morgan";
import path from "path";
import * as url from "url";
import cors from "cors";
import sockets from "./sockets.server.js";
import { PORT } from "./config.js";

// Importar rutas
import mailRoute from "./routes/mail.routes.js";
import usersRoute from "./routes/users.routes.js";
import loginRoute from "./routes/login.routes.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();
const httpServer = HttpServer(app);
const io = new SocketServer(httpServer);

// Setear middlewares
app.use(cors());
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Setear rutas
app.use("/mail", mailRoute);
app.use("/users", usersRoute);
app.use("/", loginRoute);

app.use("*", (req, res) => {
  res.redirect("/index.html");
});

sockets(io);

httpServer.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
