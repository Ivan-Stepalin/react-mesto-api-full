import { withRouter } from "react-router-dom";
import React from "react";
import Header from "./Header.js";

function Login(props) {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);

  function onSubmit(e) {
    e.preventDefault();
    props.onLoginUser({ password, email });
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header name={`Регистрация`} link={"/sign-up"} email={``}/>
      <div className="sign">
        <h2 className="sign__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default withRouter(Login);
