const users = [];

export const userJoin = (user, id, room) => {
  const newUser = { ...user, id, room };
  users.push(newUser);
  return newUser;
};

export const userLeave = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

export const getRooms = () => {
  const rooms = users.map((user) => user.room);
  const uniqueRooms = [...new Set(rooms)];
  return uniqueRooms;
};

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

export const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

export const formatMessage = (user, text) => {
  const time = new Date().toLocaleString();
  return {
    user,
    text,
    time,
  };
};
