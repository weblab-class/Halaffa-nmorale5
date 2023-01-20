import React, { useState, useEffect } from 'react';
import resolveMove from '../../attributes/moves';
import BattleLower from './BattleLower';
import BattleUpper from './BattleUpper';

export default function Battle(props) {
  const p = props.gameData;
  const e = props.enemyData;
  const [player, setPlayer] = useState({
    speed: p.speed,
    attack: p.attack,
    health: p.health,
    maxHealth: p.maxHealth,
  });
  const [enemy, setEnemy] = useState({
    speed: e.speed,
    attack: e.attack,
    health: e.health,
    maxHealth: e.health,
  });
  const enemyInfo = {
    name: e.name,
    sprite: e.sprite,
  };
  const [turnData, setTurnData] = useState({
    playersTurn: true,
    animating: false,
  });
  const [move, setMove] = useState(null);
  const [playerDied, setPlayerDied] = useState(false);
  const [enemyDied, setEnemyDied] = useState(false);

  const checkForDeaths = (newPlayer, newEnemy) => {
    if (newPlayer.health <= 0) {
      setPlayerDied(true);
    } if (newEnemy.health <= 0) {
      setEnemyDied(true);
    }
  }

  const makeMove = (moveId, playerAttacksEnemy) => {
    const [newPlayer, newEnemy] = resolveMove(player, enemy, moveId, playerAttacksEnemy);

    checkForDeaths(newPlayer, newEnemy);

    setPlayer(newPlayer);
    setEnemy(newEnemy);

    setMove(moveId);
    setTurnData({
      playersTurn: turnData.playersTurn,
      animating: true,
    })
  }

  const onSubmittedMove = (moveId) => {
    makeMove(moveId, true);
  }

  const onEnemyMadeMove = (moveId) => {
    makeMove(moveId, false);
  }

  const onMoveAnimationCompleted = () => {
    setTurnData({
      playersTurn: !turnData.playersTurn,
      animating: false,
    });
  }

  const onDeathTextCompleted = () => {
    if (playerDied) props.onPlayerDied();
    else if (enemyDied) props.onEnemyDied();
  }

  const awaitEnemyMove = () => {
    const moveId = 2 // hard-coded for now
    setTimeout(() => onEnemyMadeMove(moveId), 1000);
  }

  useEffect(() => {
    // simulates waiting for opponent input over network
    if (!turnData.playersTurn && !turnData.animating && !playerDied && !enemyDied) {
      awaitEnemyMove();
    }
  }, [turnData])

  const events = {
    onClickMove: (moveId) => onSubmittedMove(moveId),
    onFinishedText: () => onMoveAnimationCompleted(),
    onDeathTextCompleted: () => onDeathTextCompleted(),
  };
  const battleData = {
    playerDied: playerDied,
    enemyDied: enemyDied,
  };
  return (
    <>
      <BattleUpper
        attributes={props.attributes}
        gameData={props.gameData}
        player={player}
        enemy={enemy}
        enemyInfo={enemyInfo}
        turnData={turnData}
      />
      <BattleLower
        attributes={props.attributes}
        gameData={props.gameData}
        turnData={turnData}
        move={move}
        battleData={battleData}
        events={events}
      />
    </>
  )
}