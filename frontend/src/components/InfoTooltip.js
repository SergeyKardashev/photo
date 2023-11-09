import React from "react";
import iconOkLink from "../images/info-tool-tip_icon_ok.svg";
import iconErrLink from "../images/info-tool-tip_icon_err.png";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip(props) {
  const { isOpen, onClose, isRegistered } = props;

  usePopupClose(isOpen, onClose);

  const message = isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  const altText = isRegistered ? "Значок успеха" : "Значок ошибки";
  const iconSource = isRegistered ? iconOkLink : iconErrLink;

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_infotooltip">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img alt={altText} src={iconSource} className="popup__info-tooltip-img" />
        <h2 className="popup__heading popup__heading_type_infotooltip">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
