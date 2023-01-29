import React from "react";
import { Link } from "@reach/router";
import CurrencyUI from "./CurrencyUI";
import GalleryStarterEntry from "../modules/GalleryStarterEntry";
import GalleryEnemyEntry from "../modules/GalleryEnemyEntry";
import GalleryEquipmentEntry from "../modules/GalleryEquipmentEntry";
import "../../utilities.css";

export default class Gallery extends React.Component {
  render() {
    const starterList = this.props.starters;
    const enemyList = this.props.enemies;
    const equipmentList = this.props.equipment;
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName} userStarter={this.props.userStarter}/>
        <Link to="/select">
          <button>
            Back
          </button>
        </Link>
        <h1>Starters</h1>
        {starterList.map((starter) => (
          <GalleryStarterEntry
            starter = {starter}
            key={starter.id}
          />
        ))}
        <h1>Enemies</h1>
        {enemyList.map((enemy) => (
          <GalleryEnemyEntry
            enemy = {enemy}
            key={enemy.id}
          />
        ))}
        <h1>Equipment</h1>
        {equipmentList.map((equipment) => (
          <GalleryEquipmentEntry
            equipment = {equipment}
            key={equipment.id}
          />
        ))}
      </div>
    )
  }
}