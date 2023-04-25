function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <article className="element">
      <div className="element__image">
        <img
          className="element__mask-group"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        <button className="element__trash" type="button"></button>
      </div>
      <div className="element__group">
        <h2 className="element__group-title">{card.name}</h2>
        <div className="element__group-like">
          <button className="element__like" type="button"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;