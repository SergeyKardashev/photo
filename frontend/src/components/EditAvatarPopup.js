import React from "react";
import PopupWithForm from "./PopupWithForm";
import AppContext from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function EditAvatarPopup(props) {
  const { isOpen, onUpdateAvatar } = props;

  const { isLoading, closeAllPopups } = React.useContext(AppContext);
  const onClose = closeAllPopups;

  usePopupClose(isOpen, onClose);

  const avatarRef = React.useRef(); // записываю реф - заношу объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value }); // использую реф для получения значения инпута
  }

  // ощищаю форму при открытии
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar-form"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      buttonLabel={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="popup__input popup__input_type_avatar"
        id="avatar"
        ref={avatarRef}
        name="avatar"
        type="url"
        placeholder="Ссылка на изображение"
        required
      />
      <span className="avatar-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
