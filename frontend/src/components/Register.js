import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header.js";

function Register(props) {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);

  function onSubmit(e) {
    e.preventDefault();
    props.onRegisterUser({ password, email });
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header name={`Войти`} link={"/sign-in"} email={``}/>
      <div className="sign">
        <h2 className="sign__title">Регистрация</h2>
        <form className="sign-form" onSubmit={onSubmit}>
          <input
            className="sign__input"
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            value={email || ``}
          />
          <input
            className="sign__input"
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            value={password || ``}
          />
          <button className="sign__button" type="submit">
            Зарегестрироваться
          </button>
        </form>
        <Link to="/sign-in" className="sign__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default withRouter(Register);
