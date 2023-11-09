import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); // подписываюсь на контекст currentUser

  const isOwn = card.owner._id === currentUser._id;
  const isLIked = card.likes.some((i) => i._id === currentUser._id);

  const { name: cardName, link: cardLink } = card;

  const cardLikes = card.likes.length; // Определяю, есть ли у карточки лайк юзера

  const cardLikeButtonClassName = `gallery__like ${isLIked && "gallery__like_active"}`; // переменная уйдет в `className`сердечка

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="gallery__element">
      {isOwn && <button className="gallery__delete" onClick={handleDeleteClick} type="button"></button>}
      <img className="gallery__img" alt={cardName} src={cardLink} onClick={handleClick} />
      <div className="gallery__caption-wrap">
        <h2 className="gallery__text">{cardName}</h2>
        <div className="gallery__like-wrap">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="gallery__like-number">{cardLikes}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
