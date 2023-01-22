import React from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Select from "./pages/Select.js"
import Game from "./pages/Game.js";
import Home from "./pages/Home.js";
import Leaderboard from "./pages/Leaderboard.js";
import Shop from "./pages/Shop.js";
import Skeleton from "./pages/Skeleton.js";

import jwt_decode from "jwt-decode";

import "../utilities.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

import equipment from '../attributes/equipment.json' assert { type: 'JSON' };
import moves from '../attributes/moves.json' assert { type: 'JSON' };
import starters from '../attributes/starters.json' assert { type: 'JSON' };
import enemies from '../attributes/enemies.json' assert { type: 'JSON' };


/**
 * Define the "App" component
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Guest",
      userId: null,
      attributes: { equipment, moves, starters, enemies },
      currency: 10,
      equippedStarter: 1,
      unlockedStarters: [false, false, false],
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    get("/api/whoami").then((user) => {
      if (user._id !== this.state.userId) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, userName: user.name, currency: user.currency,
          equippedStarter: user.starter, unlockedStarters: [...user.unlocked]});
      }
    });
  }

  handleLogout() {
    this.setState({userId: null, userName: "Guest", currency: 0, equippedStarter: 0, unlockedStarters: [false, false, false]});
    post("/api/logout");
  };

  handleLogin(credentialResponse) {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id,  userName: user.name, currency: user.currency,
         equippedStarter: user.starter, unlockedStarters: [...user.unlocked]});
      post("/api/initsocket", { socketid: socket.id });
    });
  };


  changeStarter(starterId) {
    this.setState({equippedStarter : starterId});
  };

  unlockStarter(starterId) {
    if (this.state.currency >= starters[starterId].cost) {
      let newArray = [...this.state.unlockedStarters];
      newArray[starterId] = true;
      const body = {unlocked : newArray, currency : this.state.currency - starters[starterId].cost}
      post("/api/buy", body).then((user) => {
        this.setState({ userId: user._id,  userName: user.name, currency: user.currency,
          equippedStarter: user.starter, unlockedStarters: [...user.unlocked]});
      });
    }
  };

  debug() {
    post("/api/debug", {}).then((user) => {
      console.log("put prints here");
      this.setState({ userId: user._id,  userName: user.name, currency: user.currency,
        equippedStarter: user.starter, unlockedStarters: [...user.unlocked]});
    });
  }

  render() {
    return (
      <>
        <Router>
          <Home 
            path="/"
            handleLogin={(credentialResponse) => this.handleLogin(credentialResponse)}
            handleLogout={() => this.handleLogout()}
            userId={this.state.userId}
          />
          <Select 
            path="/select"
            currency={this.state.currency}
            userId={this.state.userId}
            userName={this.state.userName}
          />
          <Shop
            path="/shop"
            currency={this.state.currency}
            userId={this.state.userId}
            userName={this.state.userName}
            onClickChoose={(starterId) => this.changeStarter(starterId)}
            onClickBuy={(starterId) => this.unlockStarter(starterId)}
            starters={this.state.attributes.starters}
            unlockedStarters={this.state.unlockedStarters}
          />
          <Leaderboard
            path="/leaderboard"
            debug={() => this.debug()}
          />
          <Game 
            path="/game"
            attributes={this.state.attributes}
            starter={this.state.equippedStarter} 
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}
