import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { getToken, removeToken } from "../utils/token";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";
import { apiAuth } from "../utils/apiAuth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); // НЕЕЕ для авторизации, а для карточек, аватара, ФИО и обо мне
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("токен чек");
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = getToken();

    if (token) {
      apiAuth
        .validateToken(token)
        .then((response) => {
          // --- !!! в ответе объект data, в нем 2 поля _id, email !!! ---
          setUserEmail(response.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    const promisedInitialCards = api.getInitialCards();
    const promisedUserInfo = api.getUserInfo();

    Promise.all([promisedUserInfo, promisedInitialCards])
      .then(([userInfo, initialCards]) => {
        setCards(initialCards);
        setCurrentUser(userInfo);
      })
      .catch(console.error);
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch(console.error);
  }

  // универсальный обработчик запросов сабмитов от попапов. Примет запрос и обработает then, catch, finally
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(inputValues) {
    handleSubmit(() => {
      return api.setUserInfo(inputValues).then(setCurrentUser);
    });
  }

  function handleUpdateAvatar(avatarData) {
    handleSubmit(() => {
      return api.setUserAvatar(avatarData).then(setCurrentUser);
    });
  }

  function handleAddPlaceSubmit(card) {
    handleSubmit(() => {
      return api.addCard(card).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    });
  }

  function cbLogin(password, email) {
    apiAuth
      .authorize(password, email)
      .then((dataUser) => {
        setUserEmail(email);
        navigate("/", { replace: true });
        setLoggedIn(true);
        return dataUser;
      })
      .catch(console.error);
  }

  function cbRegister(userData) {
    apiAuth
      .signup(userData)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function cbSignOut() {
    removeToken();
    setLoggedIn(false);
    setUserEmail(null);
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={userEmail} onSignOut={cbSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  setCards={setCards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                />
              }
            />
            <Route path="/sign-up" element={<Register onSubmit={cbRegister} />} />
            <Route path="/sign-in/*" element={<Login onSubmit={cbLogin} />} />
            <Route path="*" element={<Login onSubmit={cbLogin} />} />
          </Routes>
          {loggedIn && <Footer />}
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegistered={isRegistered} />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
export default App;
