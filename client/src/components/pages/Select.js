import React from "react";
import SelectButtons from "../modules/SelectButtons.js";
import SelectText from "../modules/SelectText.js";
import CurrencyUI from "./CurrencyUI.js";


export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : "Hover over a button to see its description."
    }
    this.mapping = {
      // "Single Player": "Play a game by yourself, fighting a powerful boss after collecting as many power-ups as possible in 5 minutes!",
      // "Multiplayer": "Play a game with another person online, fighting the other person after you each get 5 minutes of preparation.",
      "Play": "Start the game!",
      "Shop": "Choose what starter to play as and unlock new ones with currency you earn from play.",
      "Leaderboard": "See who the top players are!",
      "Gallery": "See sprites and stats of starters and enemies."
    }
  } 
  onHover(buttonName) {
    this.setState({ text : this.mapping[buttonName] });
  }

  onUnhover(buttonName) {
    this.setState({ text: "Hover over a button to see its description." });
  }
  render() {
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName}/>
        <div className = "u-flexRow">
          <SelectButtons 
            onHover={(buttonName) => this.onHover(buttonName)} 
            onUnhover={(buttonName) => this.onUnhover(buttonName)}
          />
          <SelectText text = {this.state.text}/>
        </div>
      </div>
    )
  }
}