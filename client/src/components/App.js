import React from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Select from "./pages/Select.js"
import Game from "./pages/Game.js";
import Home from "./pages/Home.js";
import Leaderboard from "./pages/Leaderboard.js";
import Shop from "./pages/Shop.js";
import Gallery from "./pages/Gallery.js";
import Skeleton from "./pages/Skeleton.js";

import jwt_decode from "jwt-decode";

import "../utilities.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

// import equipment from '../attributes/equipment.json' assert { type: 'JSON' };
// import moves from '../attributes/moves.json' assert { type: 'JSON' };
// import starters from '../attributes/starters.json' assert { type: 'JSON' };
// import enemies from '../attributes/enemies.json' assert { type: 'JSON' };


/**
 * Define the "App" component
 */
export default class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      userName: "Guest",
      userId: null,
      currency: 10,
      attributes: {starters: [], enemies: [], moves: [], equipment: []},
      equippedStarter: 1,
      unlockedStarters: [false, false, false],
      numWins: 0,
    }
  }

  componentDidMount() {
    const grabVals = async () => {
      let equipment = await get("/api/equipments", {});
      let moves = await get("/api/moves", {});
      let starters = await get("/api/starters", {});
      let enemies = await get("/api/enemies", {});
      return { equipment, moves, starters, enemies };
      }
    grabVals().then((attr) => {
      this.setState({attributes: attr});
    });
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    get("/api/whoami").then((user) => {
      if (user._id !== this.state.userId) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, userName: user.name, currency: user.currency,
          equippedStarter: user.starter, unlockedStarters: [...user.unlocked], numWins: user.numWins});
      }
    });
  }

  handleLogout() {
    this.setState({userId: null, userName: "Guest", currency: 0, equippedStarter: 0,
     unlockedStarters: [false, false, false], numWins: 0});
    post("/api/logout");
  };

  handleLogin(credentialResponse) {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id,  userName: user.name, currency: user.currency,
         equippedStarter: user.starter, unlockedStarters: [...user.unlocked], numWins: user.numWins});
      post("/api/initsocket", { socketid: socket.id });
    });
  };


  changeStarter(starterId) {
    this.setState({equippedStarter : starterId});
  };

  unlockStarter(starterId) {
    if (this.state.currency >= this.state.attributes.starters[starterId].cost) {
      let newArray = [...this.state.unlockedStarters];
      newArray[starterId] = true;
      const body = {unlocked : newArray, currency : this.state.currency - this.state.attributes.starters[starterId].cost}
      post("/api/buy", body).then((user) => {
        this.setState({ userId: user._id,  userName: user.name, currency: user.currency,
          equippedStarter: user.starter, unlockedStarters: [...user.unlocked], numWins: user.numWins});
      });
    }
  };

  debug() {
    // post("/api/debug", {}).then((user) => {
    //   console.log("put prints here");
    //   this.setState({ userId: user._id,  userName: user.name, currency: user.currency,
    //     equippedStarter: user.starter, unlockedStarters: [...user.unlocked], numWins: user.numWins});
    // });
    console.log(this.state.attributes);
  }

  addAll() {
    post("/api/deletedata").then((res)=>{
    });
    //Why does it not add when inside the .then?? Shouldn't it be in the .then??
    let i = 0;
    while (i < starters.length){
      post("/api/addstarter", starters[i])
      i++;
    }
    i = 0;
    while (i < enemies.length){
      post("/api/addenemy", enemies[i])
      i++;
    }
    i = 0;
    while (i < moves.length){
      post("/api/addmove", moves[i])
      i++;
    }
    i = 0;
    while (i < equipment.length){
      post("/api/addequipment", equipment[i])
      i++;
    }
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
            numWins={this.state.numWins}
          />
          <Game 
            path="/game"
            attributes={this.state.attributes}
            starter={this.state.equippedStarter} 
          />
          <Gallery
            path="/gallery"
            currency={this.state.currency}
            userName={this.state.userName}
            starters={this.state.attributes.starters}
            enemies={this.state.attributes.enemies}
            equipment={this.state.attributes.equipment}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}
