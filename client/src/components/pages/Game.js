import React, { useState, useEffect } from 'react';
import Battle from '../modules/Battle.js';
import EnemySelect from '../modules/EnemySelect.js';
import LootResults from '../modules/LootResults.js';
import Stats from '../modules/Stats.js';

export default function Game(props) {
  if (!props.gameState) return (
    <h1>You're not in an active game.</h1>
  )
  let screen;
  switch (props.gameState.screen) {
    case "battle":
      screen = (
        <Battle 
          attributes={props.attributes}
          battleData={props.gameState.battleData}
          players={[
            props.gameState.id, 
            props.gameState.battleData.BOT ? "BOT" : props.gameState.opponent,
          ]}
          makeMove={props.events.makeMove}
        />
      );
      break;
    case "loot":
      screen = (
        <LootResults
          attributes={props.attributes}
          lootData={props.gameState.lootData}
          collectLoot={props.events.collectLoot}
        />
      );
      break;
    case "select":
      screen = (
        <EnemySelect
          attributes={props.attributes}
          selectionData={props.gameState.selectionData}
          selectOption={props.events.selectOption}
        />
      );
  }
  return (
    <>
      <Stats
        attributes={props.attributes}
        stats={props.gameState.generalStats}
      />
      {screen}
    </>
  )
}