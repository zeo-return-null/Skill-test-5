import fs from "fs/promises";

const fsExists = async (filePath) => {
  return await fs.access(filePath).then(
    () => true,
    () => false
  );
};

const filePath = "./src/database/data.json";
const filePathToHistoryChat = "./src/database/chat_history.json";
const filePathToLogChats = "./src/database/logs/chats_logs.txt";

const readFromDb = async () => {
  const existsInDatabase = await fsExists(filePath);

  if (existsInDatabase) {
    const database = await fs.readFile(filePath, "utf-8");
    return JSON.parse(database);
  } else {
    return { error: "no se encontro nada" };
  }
};

const writeToDb = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
};

const readHistory = async () => {
  const historyChatExists = await fsExists(filePathToHistoryChat);

  if (historyChatExists) {
    const historyChat = await fs.readFile(filePathToHistoryChat, "utf-8");
    return JSON.parse(historyChat);
  } else {
    return { error: "no se encontro nada" };
  }
};

const writeHistory = async (data) => {
  await fs.writeFile(filePathToHistoryChat, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });
};

const saveMessageToLog = async (room, user, message) => {
  const time = new Date().toLocaleString();
  const messageInLog = `
  Room al que se unio: ${room}\n
  Usuario: ${user}\n
  \t\t${message}\n
  \t - ${time}\n
  `;

  await fs.appendFile(filePathToLogChats, messageInLog);
};

export {
  readFromDb,
  writeToDb,
  readHistory,
  writeHistory,
  saveMessageToLog,
};
