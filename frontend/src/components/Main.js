import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete } = props;

  // подписываюсь на контекст пользователя.
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      {/* <!-- profile --> */}
      <section className="profile">
        <div className="profile__account">
          <button
            className="profile__avatar-edit-btn"
            type="button"
            aria-label="обновить аватар"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></button>

          {/* <!-- текстовая часть профиля --> */}
          <div className="profile__txt">
            {/* <!-- обертка имени и кнопки --> */}
            <div className="profile__name-wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        {/* <!-- button add photo --> */}
        <button className="profile__add-place-btn" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="gallery">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
