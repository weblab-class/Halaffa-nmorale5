import React from 'react';
import SelectButton from './SelectButton';
import "../../utilities.css"
import "./SelectButton.css";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "803833174485-67fjpsh9j1q1fshtp4nb0ndvqa0l6jc4.apps.googleusercontent.com";


export default class SelectButtons extends React.Component {
  render() {
    return (
      <div className="u-flexRow">
        <SelectButton 
          link="/game" 
          buttonName="Play"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <div className="currencyDivider">
        </div>
        <SelectButton
          link="/leaderboard"
          buttonName="Leaderboard"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <div className="currencyDivider">
        </div>
        <SelectButton
          link="/shop"
          buttonName="Shop"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <div className="currencyDivider">
        </div>
        <SelectButton
          link="/gallery"
          buttonName="Gallery"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <div className="currencyDivider">
        </div>
        <SelectButton
          link="/"
          buttonName="Home"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <div className="currencyDivider">
        </div>
      </div>
    )
  }
}

// {props.userId ? (
//   <GoogleLogout
//     clientId={GOOGLE_CLIENT_ID}
//     buttonText="Logout"
//     onLogoutSuccess={props.handleLogout}
//     onFailure={(err) => console.log(err)}
//     className="NavBar-link NavBar-login"
//   />
// ) : (
//   <GoogleLogin
//     clientId={GOOGLE_CLIENT_ID}
//     buttonText="Login"
//     onSuccess={props.handleLogin}
//     onFailure={(err) => console.log(err)}
//     className="NavBar-link NavBar-login"
//   />
// )}