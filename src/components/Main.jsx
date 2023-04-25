import { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onClose}) {
  
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsInfo()])
    .then(([user, cards]) => {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      setCards(cards);
    })
    .catch((error) => console.log(`Ошибка ${error}`));
  }, []);
  
  return (
    <main>
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar-edit" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватар пользователя странички"/>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h2 className="profile__title-name">{userName}</h2>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onClose={onClose}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;