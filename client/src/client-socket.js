import socketIOClient from "socket.io-client";
import { post } from "./utilities";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});

export const configureUpdates = (updateFunc) => {
  socket.on("update", updateFunc);
};

export const configureTimer = (timerFunc) => {
  socket.on("timer", timerFunc);
}

export const startQueue = (mode, userStarter) => {
  socket.emit("queue", mode, userStarter);
};

export const cancelQueue = () => {
  socket.emit("cancel");
}

export const makeMove = (moveId) => {
  socket.emit("move", moveId);
};

export const selectOption = (option) => {
  socket.emit("select", option);
}

export const collectLoot = (toDiscard) => {
  socket.emit("loot", toDiscard);
}

export const endGame = () => {
  socket.emit("end");
}