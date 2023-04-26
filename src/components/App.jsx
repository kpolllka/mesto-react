import { useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
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

  return (
    <>
      <div className="page">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />        
      </div>

      <PopupWithForm
        title="Обновить аватар"
        name="popup-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        textButton="Сохранить"
      >
        <input className="popup__input popup__input_avatar" name="avatar" id="avatar-input" type="url" placeholder="Ссылка на фото" minLength="2" required/>
        <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Редактировать профиль"
        name="popup-form"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        textButton="Сохранить"
      >
        <input className="popup__input popup__input_info_name" name="name" id="name-input" type="text" placeholder="Имя" minLength="2" maxLength="40" required/>
        <span className="popup__input-error name-input-error"></span>
        <input className="popup__input popup__input_info_job" name="about" id="job-input" type="text" placeholder="Профессия" minLength="2" maxLength="200" required/>
        <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="popup-form"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        textButton="Сохранить"
      >
        <input className="popup__input popup__input_photo_name" name="name" id="title-input" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="popup__input-error title-input-error"></span>
        <input className="popup__input popup__input_photo_link" name="link" id="link-input" type="url" placeholder="Ссылка на картинку" required/>
        <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены?"
        name="popup-delete-cards"
        onClose={closeAllPopups}
        textButton="Да"
      ></PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} 
      />
    </>
  );
}

export default App;