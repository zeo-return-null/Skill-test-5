import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../config.js";

export const createJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET_KEY, (error, token) => {
      error ? reject("Ocurrio un error al generar el JWT") : resolve(token);
    });
  });
};
