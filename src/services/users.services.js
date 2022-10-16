import * as userModel from "../models/user.model.js";

export const getAllUsers = async () => {
  const users = await userModel.getAllUsers();
  return users;
};

export const getUserById = async (userId) => {
  const user = await userModel.getUserById(userId);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await userModel.getUserByEmail(email);
  return user;
}

export const createUser = async (userData) => {
  const newUser = await userModel.createUser(userData);
  return newUser;
};

export const updateUser = async (userId, newData) => {
  const updatedUser = await userModel.updateUser(userId, newData);
  return updatedUser;
};

export const deleteUser = async (userId) => {
  const deletedUser = await userModel.deleteUser(userId);
  return deletedUser;
};
