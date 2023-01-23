import socketIOClient from "socket.io-client";
import { post } from "./utilities";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});

export const makeMove = (moveId) => {
  socket.emit("move", moveId);
}

export const configureUpdates = (updateFunc) => {
  socket.on("update", updateFunc);
}

export const startBattle = () => {
  post("/startbattle");
}