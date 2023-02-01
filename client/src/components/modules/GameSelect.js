import React from 'react';
import CurrencyUI from '../pages/CurrencyUI';
import "./GameSelect.css";

export default function GameSelect(props) {
  return (
    <>
      <CurrencyUI currency={props.currency} userName={props.userName} userStarter={props.userStarter}/>
      <div className="u-flexColumn u-flex-justifyCenter u-flex-alignCenter">
        <div className="GameSelect-single u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
          <div>
            Single Player:
          </div>
          <button onClick={() => props.startQueue("endless", props.userStarter)} className="button3">
            Endless
          </button>
        </div>
        <div className="GameSelect-divider">
        </div>
        <div className="GameSelect-multi u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
          <div>
            Multiplayer:
          </div>
          <button onClick={() => props.startQueue("classic", props.userStarter)}>
            Classic
          </button>
          <button onClick={() => props.startQueue("draft", props.userStarter)} className="button2">
            Draft
          </button>
        </div>
      </div>
    </>
  )
}