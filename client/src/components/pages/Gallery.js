import React from "react";
import { Link } from "@reach/router";
import CurrencyUI from "./CurrencyUI";
import GalleryStarterEntry from "../modules/GalleryStarterEntry";
import GalleryEnemyEntry from "../modules/GalleryEnemyEntry";
import GalleryEquipmentEntry from "../modules/GalleryEquipmentEntry";
import "../../utilities.css";
import "./Gallery.css";

export default class Gallery extends React.Component {
  render() {
    const starterList = this.props.starters;
    const enemyList = this.props.enemies;
    const equipmentList = this.props.equipment;
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName} userStarter={this.props.userStarter}/>
        <h1 className="u-mMargin">Starters</h1>
        <div className="u-flexRow u-flexWrap">
          {starterList.map((starter) => (
            <GalleryStarterEntry
              starter = {starter}
              key={starter.id}
            />
          ))}
        </div>
        <h1 className="u-mMargin titleMargin">Enemies</h1>
        <div className="u-flexRow u-flexWrap">
          {enemyList.map((enemy) => (
            <GalleryEnemyEntry
              enemy = {enemy}
              key={enemy.id}
            />
          ))}
        </div>
        <h1 className="u-mMargin titleMargin">Equipment and Effects</h1>
        <div className="u-flexRow u-flexWrap">
          {equipmentList.map((equipment) => (
            <GalleryEquipmentEntry
              equipment = {equipment}
              key={equipment.id}
            />
            
          ))}
        </div>
      </div>
    )
  }
}