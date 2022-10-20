const socket = io.connect();

const $index = document.getElementById("chat-index");
const $form = document.getElementById("chat-form");
const $rooms = document.getElementById("chat-rooms");
const $room = document.getElementById("chat-room");
const $messages = document.getElementById("chat-messages");
const $messagesForm = document.getElementById("message-form");
const $roomTitle = document.getElementById("room-title");
const $leave = document.getElementById("leave");

const connectRoom = (user, room) => {
  $room.classList.remove("visually-hidden");
  $roomTitle.classList.remove("visually-hidden");
  $messages.classList.remove("visually-hidden");
  $messagesForm.classList.remove("visually-hidden");
  $leave.classList.remove("visually-hidden");
  $index.classList.add("visually-hidden");

  socket.emit("connect:room", { user, room });
};
const connectToChatRoom = (room) => {
  connectRoom(user, room);
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const room = formData.get("room");
  if (room.trim() !== "") {
    connectRoom(user, room);
  }
});

const showRooms = (rooms) => {
  let body = `<p class="title fw-bold text-center my-4">Salas activas</p>`;

  if (rooms.length <= 0) {
    body += `<p class="title ">No hay salas</p>`;
  }

  rooms.forEach((room) => {
    body += `<button class="btn btn-primary" onclick="connectChatRoom('${room}')">Unirse a : ${room}</button>`;
  });
  $rooms.innerHTML = body;
};

const showRoom = (room, users) => {
  let body = `<h3 class="title">Sala ${room}</h3>`;
  body += `<div>`;
  users.forEach((user) => {
    body += `<p>${user.name} (${user.email})</p>`;
  });

  body += `</div>`;
  $room.innerHTML = body;
};

const showMessage = ({ user, text, time }) => {
  $messages.innerHTML += `<p>
    <span> ${time} - ${user} :</span> ${text}
  </p>`;

  // $messages.scrollTop = $messages.scrollHeight;
};

const showMessages = (messages) => {
  messages.forEach((message) => { showMessage(message) });
};

$messagesForm.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const message = formData.get("message");

  socket.emit("room:message", message);
  e.target.reset();
});

socket.on("get:rooms", ({ rooms }) => {
  showRooms(rooms);
});

socket.on("room:users", ({ room, users }) => {
  displayRoom(room, users);
});

socket.on("room:get-all-messages", (messages) => {
  showMessages(messages);
});

socket.on("room:message", (message) => {
  showMessage(message);
});

$leave.addEventListener("click", () => {
  window.location.reload();
});

/* 
Sockets funciona, necesita info del user
Falta comprobar que vistas carguen bien
*/
