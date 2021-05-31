import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo1280.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <div className='header__box'>
        <p className="header__email">{props.email}</p>
        <NavLink
          to={props.link}
          className="header__button"
          onClick={props.onLogout}
        >
          {props.name}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
