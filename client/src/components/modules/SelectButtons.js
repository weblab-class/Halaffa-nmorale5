import React from 'react';
import SelectButton from './SelectButton';

export default class SelectButtons extends React.Component {
  constructor(props) {
    super(props);
    // TODO display description based on hover in SelectText
  }

  render() {
    return (
      <div>
        <SelectButton link="/game" text="Single Player"/>
        <SelectButton link="/game" text="Multiplayer"/>
        <SelectButton link="/leaderboard" text="Leaderboard"/>
        <SelectButton link="/shop" text="Shop"/>
      </div>
    )
  }
}