import { readFromDb, writeToDb } from "../utils/database.js";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = async () => {
  const db = await readFromDb();

  if (!db.hasOwnProperty("users")) {
    db.users = [];
  }
  return db.users;
};

export const getUserById = async (userId) => {
  const db = await readFromDb();

  if (!db.hasOwnProperty("users")) {
    db.users = [];
  }

  const user = db.users.find((user) => user.id === userId);
  return user;
};

export const getUserByEmail = async (email) => {
  const db = await readFromDb();

  if (!db.hasOwnProperty("users")) {
    db.users = [];
  }

  const user = db.users.find((user) => user.email === email);
  return user;
};

export const createUser = async (user) => {
  const db = await readFromDb();

  user.id = uuidv4();

  if (!db.hasOwnProperty("users")) {
    db.users = [];
  }
  db.users = [...db.users, user];

  await writeToDb(db);
  return user;
};

export const updateUser = async (userId, newData) => {
  const db = await readFromDb();
  const user = db.users.find((user) => user.id === userId);
  const index = db.users.findIndex((user) => user.id === userId);
  const update = { ...user, ...newData };

  db.users.splice(index, 1, update);

  await writeToDb(db);
  return update;
};

export const deleteUser = async (userId) => {
  const db = await readFromDb();
  const index = db.users.findIndex((user) => user.id === userId);
  const deletedUser = db.users.splice(index, 1)[0];

  await writeToDb(db);
  return deletedUser;
};
