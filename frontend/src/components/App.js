import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import PopupWithForm from "../components/PopupWithForm.js";
import React from "react";
import ImagePopup from "../components/ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import api from "../utils/api.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login";
import Register from "./Register";
import { Route, Switch, useHistory } from "react-router-dom";
import InfoToolTip from "./InfoToolTip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import apiRegister from "../utils/apiRegister.js";

function App() {
  const [isEditAvatarFormOpened, setIsEditAvatarFormOpened] =
    React.useState(false);
  const [isAddPlaceFormOpened, setIsAddPlaceFormOpened] = React.useState(false);
  const [isEditProfileFormOpened, setIsEditProfileFormOpened] =
    React.useState(false);
  const [isConfimDeleteFormOpened, setIsConfimDeleteFormOpened] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [card, setCard] = React.useState([]);
  const [isSuccessReg, setIsSuccessReg] = React.useState(false);
  const [isErrorReg, setIsErrorReg] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(``);
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem(`token`) !== null) {
      apiRegister
        .checkToken(localStorage.getItem(`token`))
        .then((res) => {
          setEmail(res.email);
        })
        .then(() => {
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(`ошибка ${err}`);
        });
    }
  });

  function handleDeleteToken() {
    localStorage.removeItem("token");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarFormOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceFormOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileFormOpened(true);
  }

  function closeAllPopups() {
    setIsEditAvatarFormOpened(false);
    setIsAddPlaceFormOpened(false);
    setIsEditProfileFormOpened(false);
    setIsConfimDeleteFormOpened(false);
    setSelectedCard(false);
    setIsSuccessReg(false);
    setIsErrorReg(false);
  }

  function handleUserProfileSubmit(input) {
    api
      .sendUserInfo(input)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleUserAvatarSubmit(input) {
    console.log(input);
    api
      .updateAvatar(input)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit(input) {
    api
      .addCard(input)
      .then((res) => {
        setCard([res, ...card]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser.id);
    console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCard((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  React.useEffect(() => {
    handleUserData();
    drawCard();
  }, []);

  const handleUserData = () => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          id: data._id,
        });
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const drawCard = () => {
    api
      .initialCard()
      .then((data) => {
        const cards = data.map((item) => {
          return {
            name: item.name,
            link: item.link,
            likes: item.likes,
            _id: item._id,
            owner: item.owner,
          };
        });
        setCard(cards);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  function handleRegisterUser(registerData) {
    apiRegister
      .registerUser(registerData)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsSuccessReg(true);
          history.push("/sign-in");
        } else {
          setIsErrorReg(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginUser(loginData) {
    apiRegister
      .loginUser(loginData)
      .then((result) => {
        localStorage.setItem(`token`, result.token);
        handleUserData();
        drawCard();
        setEmail(loginData.email);
        console.log(email);
        setLoggedIn(true);
        setIsSuccessReg(true);
        history.push("/");
      })
      .catch((err) => {
        setIsErrorReg(true);
        console.log(err);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            card={card}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={setSelectedCard}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onLogout={handleDeleteToken}
            email={email}
          />

          <Route path="/sign-up">
            <Register onRegisterUser={handleRegisterUser} />
          </Route>

          <Route path="/sign-in">
            <Login onLoginUser={handleLoginUser} />
          </Route>
        </Switch>

        <Footer />

        <PopupWithForm
          name="confim"
          title="Вы уверены?"
          submitText="Да"
          isOpened={isConfimDeleteFormOpened}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          open={handleEditProfileClick}
          isOpened={isEditProfileFormOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUserProfileSubmit}
        />

        <EditAvatarPopup
          isOpened={isEditAvatarFormOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUserAvatarSubmit}
          open={handleEditAvatarClick}
        />

        <AddPlacePopup
          isOpened={isAddPlaceFormOpened}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoToolTip
          text={"Вы успешно зарегистрировались"}
          image={true}
          isOpened={isSuccessReg}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          text={`Что-то пошло не так! Попробуйте ещё раз.`}
          image={false}
          isOpened={isErrorReg}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
