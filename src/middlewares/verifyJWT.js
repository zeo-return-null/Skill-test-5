import jwt from "jsonwebtoken";
import * as users from "../models/user.model.js";
import { JWT_SECRET_KEY } from "../config.js";

export const verifyJWT = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    
    try {
      const { id } = jwt.verify(bearerToken, JWT_SECRET_KEY);

      const user = await users.getUserById(id);
      if (!user) {
        return res.status(401).json({ error: "Usuario inexistente" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Al parecer el token no es valido" });
    }

  } else {
    res.status(403).json({});
  }
};
