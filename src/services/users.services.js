import * as user from "../models/user.model.js";

export const getAllUsers = async () => {
  const users = await user.getAllUsers();
  return users;
};

export const getUser = async (userId) => {
  const user = await user.getUser(userId);
  return user;
};

export const createUser = async (userData) => {
  const newUser = await user.createUser(userData);
  return newUser;
};

export const updateUser = async (userId, newData) => {
  const updatedUser = await user.updateUser(userId, newData);
  return updatedUser;
};

export const deleteUser = async (userId) => {
  const deletedUser = await user.deleteUser(userId);
  return deletedUser;
};
