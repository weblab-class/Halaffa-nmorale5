import React from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Select from "./pages/Select.js"
import Game from "./pages/Game.js";
import Home from "./pages/Home.js";
import Leaderboard from "./pages/Leaderboard.js";
import Shop from "./pages/Shop.js";

import "../utilities.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

import equipment from '../attributes/equipment.json' assert { type: 'JSON' };
import moves from '../attributes/moves.json' assert { type: 'JSON' };
import starters from '../attributes/starters.json' assert { type: 'JSON' };
//import enemies from '../attributes/enemies.json' assert { type: 'JSON' };


/**
 * Define the "App" component
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId: 237589,
      attributes: { equipment, moves, starters },
      currency: 100,
      equippedStarter: 1,
      unlockedStarters: [true, true, false],
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin(res) {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout() {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  changeStarter(starterId) {
    this.setState({equippedStarter : starterId});
  };

  unlockStarter(starterId) {
    if (this.state.currency >= starters[starterId].cost) {
      let newArray = this.state.unlockedStarters;
      newArray[starterId] = true;
      this.setState({unlockedStarters : newArray});
      this.setState({currency : this.state.currency - starters[starterId].cost});
    }
  };

  render() {
    return (
      <>
        <Router>
          <Home 
            path="/"
          />
          <Select 
            path="/select"
            currency={this.state.currency}
            userId={this.state.userId}
          />
          <Shop
            path="/shop"
            currency={this.state.currency}
            userId={this.state.userId}
            onClickChoose={(starterId) => this.changeStarter(starterId)}
          />
          <Leaderboard
            path="/leaderboard"
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
