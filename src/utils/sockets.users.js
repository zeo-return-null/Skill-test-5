const users = [];

const userJoin = (id, user, room) => {
  const newUser = { ...id, user, room };
  users.push(newUpser);
  return newUser;
};

const userLeave = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

const getRooms = () => {
  const rooms = users.map((user) => user.room);
  const uniqueRooms = [...new Set(rooms)];

  return uniqueRooms;
};

const getUsersInRoom = (room) => {
  const users = users.filter((user) => user.room === room);
  return users;
};

const getCurrentUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

const formatMessage = (user, text) => {
  const time = new Date().toLocaleDateString();

  return {
    user,
    text,
    time,
  };
};


export {
  userJoin,
  userLeave,
  getRooms,
  getUsersInRoom,
  getCurrentUser,
  formatMessage,
};