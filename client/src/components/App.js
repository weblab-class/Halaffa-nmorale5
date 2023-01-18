import React from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Game from "./pages/Game.js";

import "../utilities.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

import equipment from '../attributes/equipment.json' assert { type: 'JSON' };
import moves from '../attributes/moves.json' assert { type: 'JSON' };
import starters from '../attributes/starters.json' assert { type: 'JSON' };

/**
 * Define the "App" component
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId: undefined,
      attributes: { equipment, moves, starters },
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
  }

  handleLogout() {
    this.setState({ userId: undefined });
    post("/api/logout");
  }

  render() {
    return (
      <>
        <Router>
          <Game 
            path="/"
            attributes={this.state.attributes}
            starter={1} 
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}
