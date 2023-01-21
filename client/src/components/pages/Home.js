import GoogleLogin, { GoogleLogout } from "react-google-login";
import React from "react";
import { Link } from "@reach/router";
//import "../../images/FireDude.png";

//TODO: REPLACE WITH CLIENT_ID
const GOOGLE_CLIENT_ID = "803833174485-67fjpsh9j1q1fshtp4nb0ndvqa0l6jc4.apps.googleusercontent.com";

export default class Home extends React.Component {

  render() {
    return (
      <div>
        {// <img src = "/../../images/FireDude.png"/> replace later with RUINS logo
        }
        <button>
          <Link to="/select">
              Quickplay
          </Link>
        </button>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    )
  }
}