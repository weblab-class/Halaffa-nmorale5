const gameLogic = require("./game-logic");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const GAME_TIME = 60; // how long the game lasts before final battle
const timers = {};    // maps game IDs to the currently remaining time
const toCancel = {};  // maps game IDs to any setTimeouts that should cancel upon final battle

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

const sendTime = (id) => {
  if (getSocketFromUserID(id)) {
    getSocketFromUserID(id).emit("timer", timers[id]);
  }
}

const startTimer = (id) => {
  if (gameLogic.getGame(id).gameMode != "classic") {
    toCancel[id] = [] // make dummy list to avoid bugs
    return;
  }
  timers[id] = GAME_TIME;
  toCancel[id] = [setInterval(() => {
    timers[id]--;
    if (timers[id] >= 0) {
      sendTime(id);
    } else {
      gameLogic.startFinalBattle(id)
      sendNewGameState(id);
      timers[id] = undefined;
      sendTime(id); // tell client to disable timer display
      toCancel[id].forEach(clearTimeout); // cancel ongoing intervals/timeouts
    }
  }, 1000)]
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

      socket.on("queue", (mode) => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        const completedLobby = gameLogic.addPlayer(user._id, mode);
        if (completedLobby) {
          completedLobby.forEach((id) => {
            gameLogic.startGame(id);
            sendNewGameState(id);
            startTimer(id);
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
        toCancel[user._id].push(setTimeout(() => {
          // choose & process move for bot or allow opponent to select their next move
          const gameOver = gameLogic.progressBattle(user._id);
          sendNewGameState(user._id)
          if (opponentIsBot && !gameOver) {
            toCancel[user._id].push(setTimeout(() => {
              // allow player to select their next move
              gameLogic.progressBattle(user._id);
              sendNewGameState(user._id)
            }, 2000))
          }
        }, 2000));
        if (!opponentIsBot) {
          const opponent = gameLogic.getGame(user._id).opponent;
          // copy move for opponent
          gameLogic.getGame(opponent).battleData = {...gameLogic.getGame(user._id).battleData};
          sendNewGameState(opponent);
          toCancel[opponent].push(setTimeout(() => {
            // allow player to select their move
            gameLogic.progressBattle(opponent);
            sendNewGameState(opponent);
          }, 2000));
        }
      });

      socket.on("select", (option) => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        gameLogic.select(user._id, option);
        const opponent = gameLogic.getGame(user._id).opponent;
        if (gameLogic.getGame(user._id).screen == "waiting" && gameLogic.getGame(opponent).screen == "waiting") {
          gameLogic.startFinalBattle(user._id);
          gameLogic.startFinalBattle(opponent);
          sendNewGameState(opponent);
        }
        sendNewGameState(user._id);
      });

      socket.on("loot", (discards) => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        gameLogic.loot(user._id, discards);
        sendNewGameState(user._id);
      });

      socket.on("end", () => {
        const user = getUserFromSocketID(socket.id);
        if (!user) return;
        gameLogic.removePlayer(user._id);
        sendNewGameState(user._id);
      })
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
