
import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import "../../utilities.css";
import "./Home.css";


const GOOGLE_CLIENT_ID = "803833174485-67fjpsh9j1q1fshtp4nb0ndvqa0l6jc4.apps.googleusercontent.com";

export default class Home extends React.Component {

  render() {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="u-flexColumn u-flex-alignCenter">
          <img className="logo" src = {require('../../images/rUIns.png').default} />
          <div className="homeButtons u-flexRow">
            <button onMouseOver="buttonOnHover">
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
          </div>
        </div>
      </GoogleOAuthProvider>
    )
  }
}