import React from "react";
import "../../utilities.css";
import "./CurrencyUI.css";
import { get, post } from "../../utilities";




export default class CurrencyUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starterSprite: "WaterStarter.png",
    }
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
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
      <div className={"u-flexRow currencyUI u-flexGrow " + color}>
        <h1 className="currencyEntry">
          $: {this.props.currency}
        </h1>
        
        <h1 className="currencyEntry">
          User: {this.props.userName}
        </h1>
        <img
          className='spriteSSmall spriteimg'
          src={require('../../images/' + this.state.starterSprite).default} 
        />
      </div>
    )
  }
}