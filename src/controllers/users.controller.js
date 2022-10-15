import * as user from "../services/users.services.js";

export const getAllUsers = async (req, res) => {
  const allUsers = await user.getAllUsers();
  res.status(200).json({ users: allUsers });
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await user.getUser(userId);

  if (!user) {
    return res.status(404).json({ error: "No se encontro el usuario" });
  }
  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        error: "Hay campos incompletos, por favor rellenelos antes de enviar.",
      });
  }

  const newUser = {
    name,
    email,
    password,
  };

  const createdUser = await user.createUser(newUser);

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

  const updatedUser = await user.updateUser(userId, newData);

  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await user.deleteUser(userId);
  res.status(200).json(deletedUser);
};
