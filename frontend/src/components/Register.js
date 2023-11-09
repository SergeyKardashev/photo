import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
  //
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    onSubmit(formValue);
  }

  return (
    <div className="auth">
      <h1 className="auth__header">Регистрация</h1>
      <form onSubmit={handleSubmitRegister} className="auth__form">
        <fieldset className="auth__fieldset">
          <input
            name="email"
            onChange={handleChange}
            value={formValue.email}
            className="auth__input"
            placeholder="Email"
            type="email"
            required
          ></input>
          <input
            name="password"
            onChange={handleChange}
            value={formValue.password}
            className="auth__input"
            placeholder="Пароль"
            type="password"
            required
          ></input>
        </fieldset>
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
        <p className="auth__paragraph">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth__paragraph-link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
