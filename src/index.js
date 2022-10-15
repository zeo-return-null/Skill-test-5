import express from "express";
import { createServer as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import morgan from "morgan";
import path from "path";
import * as url from "url";
import { engine } from "express-handlebars";
import cors from "cors";
import sockets from "./sockets.server.js";
import { PORT } from "./config.js";

// Import routes
import mailRoute from "./routes/mail.routes.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Start express, http and socket server 
const app = express();
const httpServer = HttpServer(app);
const io = new SocketServer(httpServer);

// Set middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const views_path = path.join(__dirname, "views");

// Set template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("views", views_path);
app.set("view engine", "hbs");

// Set routes
app.use("/mail", mailRoute);

app.get("/home", (req, res) => {
  res.send("Home");
});

app.use("*", (req, res) => {
  res.redirect("/home");
});

sockets(io);

app.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
