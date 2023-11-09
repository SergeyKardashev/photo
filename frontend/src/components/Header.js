import React from "react";
import logoPath from "../images/logo.svg";
import { Link, Route, Routes, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  console.log(location);

  return (
    <header className="header page__header">
      <img className="header__logo" src={logoPath} alt="лого проекта Место" />
      <Routes>
        <Route
          path="/"
          element={
            <p className="header__profile">
              <span className="header__profile-email">{props.email}</span>
              <span onClick={props.onSignOut} className="header__profile header__profile_dimmed">
                Выйти
              </span>
            </p>
          }
        />
        <Route
          path="/sign-up"
          element={
            <p className="header__profile">
              <span className="header__profile-email">{props.email}</span>
              <Link to="/sign-in" replace className="header__profile">
                Войти
              </Link>
            </p>
          }
        />
        <Route
          path="/sign-in"
          element={
            <p className="header__profile">
              <span className="header__profile-email">{props.email}</span>
              <Link to="/sign-up" replace className="header__profile">
                Регистрация
              </Link>
            </p>
          }
        />
      </Routes>
    </header>
  );
}
export default Header;
