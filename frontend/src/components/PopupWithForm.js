import React from "react";

function PopupWithForm(props) {
  const { name, title, isOpen, onClose, buttonLabel, children, onSubmit } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit} name={`${name}-form`}>
          {children}
          <button className="popup__submit-button" type="submit">
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
