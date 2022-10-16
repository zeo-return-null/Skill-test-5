import * as userServices from "../services/users.services.js";
import { encryptPassword } from "../utils/encrypt.js";

export const getAllUsers = async (req, res) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200).json({ users: allUsers });
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const users = await userServices.getUserById(userId);

  if (!users) {
    return res.status(404).json({ error: "No se encontro el usuario por Id" });
  }
  res.status(200).json(users);
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const users  = await userServices.getUserByEmail(email);

  if (!users) {
    return res.status(404).json({ error: "No se encontro el usuario por email " + email });
  }
  res.status(200).json(users);
}

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        error: "Hay campos incompletos, por favor rellenelos antes de enviar.",
      });
  }

  const encryptedPassword = await encryptPassword(password);

  const newUser = {
    name,
    email,
    encryptedPassword,
  };

  const createdUser = await userServices.createUser(newUser);

  res.status(201).json(createdUser);
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  const newData = {};

  if (name) {
    newData.name = name;
  }
  if (email) {
    newData.email = email;
  }
  if (password) {
    newData.password = password;
  }

  const updatedUser = await userServices.updateUser(userId, newData);

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await userServices.deleteUser(userId);
  res.status(200).json(deletedUser);
};
