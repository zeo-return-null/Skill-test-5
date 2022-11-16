import * as userServices from "../services/users.services.js";
import { createJWT } from "../utils/createJWT.js";
import { comparePassword, encryptPassword } from "../utils/encrypt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "No se encontro el usuario" });
    }

    const validatePassword = await comparePassword(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ error: "Contraseña invalida" });
    }

    const token = await createJWT({ id: user.id });

    const { password: pwd, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const register = async (req, res) => {
  const { user, password, email } = req.body;

  if (!user || !password || !email) {
    return res.status(400).json({
      error:
        "No se encuentran todos los campos completos, por favor rellenalos antes de intentar registrarte",
    });
  }

  try {
    const userExist = await userServices.getUserByEmail(email);
    if (userExist) {
      return res
        .status(400)
        .json({ error: "El usuario ya existe", user: userExist });
    }

    const encryptedPassword = await encryptPassword(password);

    const newUser = {
      user,
      email,
      password: encryptedPassword,
    };

    const createdUser = await userServices.createUser(newUser);

    const { password: pwd, ...createdUserWithoutPassword } = createdUser;
    res.status(201).json(createdUserWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
