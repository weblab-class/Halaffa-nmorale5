import React from "react";
import { Link } from "@reach/router";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>
          <Link to="/select">
              Back
          </Link>
        </button>
        <button onClick={this.props.debug}>
          Debug
        </button>
      </div>
    )
  }
}