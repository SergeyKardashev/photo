import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function EditProfilePopup(props) {
  const { isOpen, onUpdateUser } = props;

  const { isLoading, closeAllPopups } = React.useContext(AppContext);
  const onClose = closeAllPopups;

  usePopupClose(isOpen, onClose);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile-form"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      buttonLabel={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="popup__input popup__input_type_user-name"
        value={name ? name : ""}
        onChange={handleNameChange}
        id="user-name"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="user-name-input-error popup__error"></span>
      <input
        className="popup__input popup__input_type_user-about"
        value={description ? description : ""}
        onChange={handleDescriptionChange}
        id="user-about"
        name="about"
        type="text"
        placeholder="Обо мне"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="user-about-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
