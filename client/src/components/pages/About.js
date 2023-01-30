import React from "react";
import CurrencyUI from "./CurrencyUI.js";
import { get, post } from "../../utilities";


export default class About extends React.Component {

  componentDidMount() {
    post("/api/played");
  }

  render() {
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName} userStarter={this.props.userStarter}/>
        <p>Welcome to RUINS!</p>
        <p>
          RUINS is a Role Play Game (RPG) where you BATTLE ENEMIES in the dungeon for some time, all the while
          becoming stronger by gaining EQUIPMENT, learning new and more powerful MOVES, and increasing your
          STATS.
        </p>
        <p>
          Once the timer hits 0, you are then put into a BATTLE with another person who was also thrown into
          a dungeon for the same amount of time. The goal is to use the advantages you gained from fighting in
          the dungeon to defeat your opponent in the final BATTLE. Once that is over, your character is reset back
          to the original, ready to start a new game.
        </p>
        <p>Battle</p>
        <p>
          In a BATTLE, you play as the STARTER you currently have equipped. During the battle, the character with
          the highest SPEED STAT is the first to take a turn, with ties broken arbitrarily. When it is your turn,
          some effects due to MOVES or EQUIPMENT may apply when applicable, and you must also choose one of your
          MOVES to use. Your turn concludes once you have selected one of your MOVES. The battle ends when either
          character's HEALTH drops at or below zero. The character with HEALTH remaining at the end wins. At the
          conclusion of a BATTLE, your HEALTH is restored back to full. 
        </p>
        <p>Moves</p>
        <p>
          Each character has a selection of MOVES they can choose from. They can have up to three MOVES to use
          during BATTLE. Any additional MOVES you attempt to learn past the three maximum will require removing
          one of the already existing MOVES. All MOVES have both a power and accuracy. Power increases a move's
          effect, such as damage or healing. Power can be increased by having more of a move's corresponding
          COLOR. Accuracy is the chance that MOVES work as a percentage. MOVES are guaranteed to work if their
          accuracy is greater than or equal to 100. MOVES with less than 100 accuracy may do nothing and end your
          turn. Accuracy is increased by your SPEED and decreased by opponent SPEED. You can get new MOVES by
          defeating ENEMIES and increasing COLOR.
        </p>
        <p>Starter</p>
        <p>
          Each STARTER has its own set of MOVES and STATS unique to the character. You can select what STARTER
          to play as in the SHOP menu before choosing a game mode. Choose your STARTER wisely! 
        </p>
        <p>Enemies</p>
        <p>
          ENEMIES are Non-Player Characters (NPCs), meaning that they are controlled by AI. ENEMIES BATTLE you just
          like real people, but they also drop EXPERIENCE and either MOVES or EQUIPMENT which you get to keep after
          the BATTLE if you win. In the dungeon, you can choose to fight easy, medium, or hard ENEMIES. The more
          difficult the fight, the more powerful items you get from the enemy after defeating them. If ENEMIES defeat
          you, you can reselect an enemy from the previous ENEMY SELECT screen. All enemies get progressively more
          powerful the more you defeat.
        </p>
        <p>Equipment</p>
        <p>
          EQUIPMENT are buffs you gain from defeating ENEMIES. These can both increase your COLOR and give
          varying effects to your character. Make sure to check their descriptions by hovering over their icons
          during BATTLE.
        </p>
        <p>Stats</p>
        <p>
          There are six STATS every player and enemy has:
        </p>
        <ul>
          <li>Attack: Increases damage done to opponents by MOVES.</li>
          <li>Health: Goes down by taking damage. Keep above zero to keep playing.</li>
          <li>Speed: Determines who goes first. Makes moves more accurate.</li>
          <li>Red: A COLOR. Increases the power of RED moves.</li>
          <li>Blue: A COLOR. Increases the power of BLUE moves.</li>
          <li>Green: A COLOR. Increases the power of GREEN moves.</li>
        </ul>
        <p>
          STATS can be increases by defeating ENEMIES, obtaining EQUIPMENT, or using some MOVES.
        </p>
        <p>Game Modes</p>
        <p>
          There are currently three different game modes to choose from, found in the PLAY tab:
        </p>
        <ul>
          <li>Classic: BATTLE ENEMIES for three minutes, then fight another person in a final BATTLE.</li>
          <li>Endless: Continuously BATTLE ENEMIES until you lose a BATTLE. Try to last as long as possible.</li>
          <li>Draft: Skip the ENEMIES. Just choose EQUIPMENT then BATTLE another player.</li>
        </ul>
      </div>
    )
  }
}