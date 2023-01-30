import React, { useState, useEffect } from 'react';
import Battle from '../modules/Battle.js';
import EnemySelect from '../modules/EnemySelect.js';
import LootResults from '../modules/LootResults.js';
import Stats from '../modules/Stats.js';
import GalleryStarterEntry from "../modules/GalleryStarterEntry";
import GalleryEnemyEntry from "../modules/GalleryEnemyEntry";
import GalleryEquipmentEntry from "../modules/GalleryEquipmentEntry";

import { configureUpdates, configureTimer, startQueue, makeMove, selectOption, collectLoot, endGame } from "../../client-socket";
import GameSelect from '../modules/GameSelect.js';
import Timer from '../modules/Timer.js';
import GameOver from '../modules/GameOver.js';
import Waiting from '../modules/Waiting.js';
import "./Gallery.css";
import "./Game.css";

export default function Game(props) {
  const [gameState, setGameState] = useState(null);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    configureUpdates(setGameState);
    configureTimer(setTimer);
  }, [])
  console.log(gameState);
  if (!gameState) return (
    <GameSelect 
      startQueue={startQueue}
      currency={props.currency}
      userName={props.userName}
      userStarter={props.userStarter}
      />
  );
  if (!gameState.opponent) return (
    <div className="u-flexColumn">
      <h1 className="u-flex-justifyCenter u-mMargin">You joined the queue! Waiting for an opponent...</h1>
      <h1 className="u-mMargin">Starters</h1>
      <div className="u-flexRow u-flexWrap">
        {props.attributes.starters.map((starter) => (
          <GalleryStarterEntry
            starter = {starter}
            key={starter.id}
          />
        ))}
      </div>
      <h1 className="u-mMargin titleMargin">Enemies</h1>
      <div className="u-flexRow u-flexWrap">
        {props.attributes.enemies.map((enemy) => (
          <GalleryEnemyEntry
            enemy = {enemy}
            key={enemy.id}
          />
        ))}
      </div>
      <h1 className="u-mMargin titleMargin">Equipment</h1>
      <div className="u-flexRow u-flexWrap">
        {props.attributes.equipment.map((equipment) => (
          <GalleryEquipmentEntry
            equipment = {equipment}
            key={equipment.id}
          />
          
        ))}
      </div>
    </div>
    
  );
  if (["win", "lose", "end"].includes(gameState.screen)) return (
    <GameOver
      game={gameState}
      onWin={props.onWin}
      addCurrency={props.addCurrency}
      endGame={endGame}
    />
  )
  let screen;
  switch (gameState.screen) {
    case "battle":
      screen = (
        <Battle 
          attributes={props.attributes}
          battleData={gameState.battleData}
          players={[
            gameState.id, 
            gameState.battleData.BOT ? "BOT" : gameState.opponent,
          ]}
          makeMove={makeMove}
        />
      );
      break;
    case "loot":
      screen = (
        <LootResults
          attributes={props.attributes}
          lootData={gameState.lootData}
          collectLoot={collectLoot}
        />
      );
      break;
    case "select":
      screen = (
        <EnemySelect
          attributes={props.attributes}
          selectionData={gameState.selectionData}
          selectOption={selectOption}
        />
      );
      break;
    case "waiting":
      screen = (
        <Waiting />
      );
      break;
  }
  return (
    <div>
      <div className="Game-topContainer u-flexColumn u-flex-alignCenter">
        <Timer 
          timer={timer}
        />
        {screen}
      </div>
      <div>
        <Stats
          attributes={props.attributes}
          stats={gameState.generalStats}
        />
      </div>
    </div>
  )
}