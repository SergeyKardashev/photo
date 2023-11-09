import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  const { _id: cardId, link: cardLink, name: cardName } = card;

  // usePopupClose(isOpen, onClose);
  usePopupClose(card?.link, onClose);

  return (
    <div className={`popup popup_type_zoom-image ${cardId ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_zoom-image">
        <button
          className="popup__close-button popup__close-button_type_zoom-image"
          type="button"
          onClick={cardId && onClose}
        ></button>
        <img className="popup__image-zoom" src={cardId && cardLink} alt={cardId && cardName} />
        <p className="popup__caption">{cardId && cardName}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
