import React, { useState, useEffect } from 'react';
import Battle from '../modules/Battle.js';
import EnemySelect from '../modules/EnemySelect.js';
import LootResults from '../modules/LootResults.js';
import Stats from '../modules/Stats.js';

import { configureUpdates, configureTimer, startQueue, makeMove, selectOption, collectLoot } from "../../client-socket";
import GameSelect from '../modules/GameSelect.js';
import Timer from '../modules/Timer.js';
import WinLose from '../modules/WinLose.js';

export default function Game(props) {
  const [gameState, setGameState] = useState(null);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    configureUpdates(setGameState);
    configureTimer(setTimer);
  }, [])
  console.log(gameState);
  if (!gameState) return (
    <GameSelect startQueue={startQueue}/>
  );
  if (!gameState.opponent) return (
    <h1>You joined the queue! Waiting for an opponent...</h1>
  );
  if (gameState.screen == "win") return (
    <WinLose win={true} />
  )
  if (gameState.screen == "lose") return (
    <WinLose win={false} />
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
  }
  return (
    <>
      <Timer 
        timer={timer}
      />
      {screen}
      <Stats
        attributes={props.attributes}
        stats={gameState.generalStats}
      />
    </>
  )
}