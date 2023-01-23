
import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
//import "../../images/FireDude.png";

const GOOGLE_CLIENT_ID = "803833174485-67fjpsh9j1q1fshtp4nb0ndvqa0l6jc4.apps.googleusercontent.com";

export default class Home extends React.Component {

  render() {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {// <img src = "/../../images/FireDude.png"/> replace later with RUINS logo
        }
        <button>
          <Link to="/select">
              Quickplay
          </Link>
        </button>
        {this.props.userId ? (
        <button
          onClick={() => {
            googleLogout();
            this.props.handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/select">
          <GoogleLogin onSuccess={this.props.handleLogin} onError={(err) => console.log(err)} />
        </Link>
      )}
      </GoogleOAuthProvider>
    )
  }
}