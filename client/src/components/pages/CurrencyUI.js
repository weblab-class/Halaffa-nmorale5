import React from "react";
import "../../utilities.css";
import "./CurrencyUI.css";
import { get, post } from "../../utilities";
import SelectButtons from "../modules/SelectButtons.js";



export default class CurrencyUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starterSprite: "WaterStarter.png",
    }
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    console.log(this.props.userStarter)
    get("/api/starter", {id: this.props.userStarter}).then((starter) => {
      if (starter.sprite !== this.state.starterSprite) {
        this.setState({starterSprite: starter.sprite});
      }
    });
  }

  render() {
    let color = "green";
    const starterID = this.props.userStarter;
    if (starterID == 0 || starterID == 4) {
      color = "blue";
    }
    else if (starterID == 1 || starterID == 5) {
      color = "red";
    }
    return (
      <div className={"u-flexRow currencyUI u-flexGrow  u-flexWrap " + color}>
        <SelectButtons 
            onHover={(buttonName) => this.onHover(buttonName)} 
            onUnhover={(buttonName) => this.onUnhover(buttonName)}
          />
        <p className="currencyEntry">
          $: {this.props.currency}
        </p>
        
        <p className="currencyEntry">
          User: {this.props.userName}
        </p>
        <img
          className='spriteSSmall spriteimg'
          src={require('../../images/' + this.state.starterSprite).default} 
        />
      </div>
    )
  }
}