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
  if (getSocketFromUserID(id)) {
    getSocketFromUserID(id).emit("update", gameLogic.getGame(id));
  }
}

const rejoinGame = (id) => {
  if (gameLogic.getGame(id)) {
    sendNewGameState(id);
  }
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
        if (!user) return;
        const resultingLobby = gameLogic.addPlayer(user._id);
        if (resultingLobby && resultingLobby.length == 2) {
          resultingLobby.forEach((id) => {
            gameLogic.startGame(id);
            sendNewGameState(id);
          });
        } else {
          sendNewGameState(user._id);
        }
        console.log(gameLogic.allGames)
      })

      socket.on("move", (moveId) => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        // process move and make animation play
        gameLogic.move(user._id, user._id, moveId);
        sendNewGameState(user._id);
        const opponentIsBot = gameLogic.getGame(user._id).battleData.BOT
        setTimeout(() => {
          // choose & process move for bot or allow opponent to select their next move
          gameLogic.progressBattle(user._id);
          sendNewGameState(user._id)
          if (opponentIsBot) {
            setTimeout(() => {
              // allow player to select their next move
              gameLogic.progressBattle(user._id);
              sendNewGameState(user._id)
            }, 2000)
          }
        }, 2000);
        if (!opponentIsBot) {
          const opponent = gameLogic.getGame(user._id).opponent;
          // process move for opponent and make their screen animate
          gameLogic.move(opponent, user._id, moveId);
          sendNewGameState(opponent);
          setTimeout(() => {
            // allow player to select their move
            gameLogic.progressBattle(opponent);
            sendNewGameState(opponent);
          }, 2000);
        }
      });

      socket.on("select", (option) => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        gameLogic.select(user._id, option);
        sendNewGameState(user._id);
      });

      socket.on("loot", (discards) => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        gameLogic.loot(user._id, discards);
        sendNewGameState(user._id);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  sendNewGameState: sendNewGameState,
  rejoinGame: rejoinGame,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
