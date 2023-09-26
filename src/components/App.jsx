import { useState, useEffect } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsInfo()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((error) => console.log(`Ошибка ${error}`));
  }, []);
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    // setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen); //аналог выше
  };
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    
    api.toggleLike(card._id, isLiked)
    .then((newCard) => { // Отправляем запрос в API и получаем обновлённые данные карточки
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    }).catch((error) => console.log(`Ошибка ${error}`));
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
    .then(()=>{
      setCards(cards.filter((c)=> c._id !== card._id));
    }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const handleUpdateUser = (data) => {
    api.setUserEdit(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const handleUpdateAvatar = (data) => {
    api.setAvatarEdit(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      }).catch((error) => console.log(`Ошибка ${error}`));
  }

  const handleAddPlaceSubmit = (data) => {
    api
      .createNewCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((error) => console.log(`Ошибка ${error}`));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />        

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        

        <PopupWithForm
          title="Вы уверены?"
          name="popup-delete-cards"
          onClose={closeAllPopups}
          textButton="Да"
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} 
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;