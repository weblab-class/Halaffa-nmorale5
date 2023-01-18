import GoogleLogin, { GoogleLogout } from "react-google-login";
import React from "react";
import { Link } from "@reach/router";
//import "../../images/FireDude.png";

//TODO: REPLACE WITH CLIENT_ID
//const GOOGLE_CLIENT_ID = "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src = "/../../images/FireDude.png"/> {// replace later with RUINS logo
        }
        <button>
          <Link to="/select">
              Quickplay
          </Link>
        </button>
      </div>
    )
  }
}