const gameLogic = require("./game-logic");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }
  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

const sendNewGameState = (id) => {
  getSocketFromUserID(id).emit("update", gameLogic.getGame(id));
}

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });

      socket.on("queue", (x) => {
        const user = getUserFromSocketID(socket.id);
        const resultingLobby = gameLogic.addPlayer(user._id);
        if (resultingLobby.length == 2) {
          resultingLobby.forEach((id) => {
            gameLogic.startGame(id);
            sendNewGameState(id);
          });
        }
      })

      socket.on("move", (moveId) => {
        const user = getUserFromSocketID(socket.id);
        gameLogic.move(user._id, moveId);
        sendNewGameState(user._id);
        setTimeout(() => gameLogic.progressBattle(user._id));
        if (!gameLogic.getGame(user._id).battleData.BOT) {
          const opponent = gameLogic.getGame(user._id).opponent;
          sendNewGameState(opponent);
          setTimeout(() => gameLogic.progressBattle(opponent));
        }
      });

      socket.on("select", (option) => {
        const user = getUserFromSocketID(socket.id);
        gameLogic.select(user._id, option);
        sendNewGameState(user._id);
      });

      socket.on("loot", (discards) => {
        const user = getUserFromSocketID(socket.id);
        gameLogic.loot(user._id, discards);
        sendNewGameState(user._id);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  startBattle: startBattle,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
