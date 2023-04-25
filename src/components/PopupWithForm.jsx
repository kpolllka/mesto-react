function PopupWithForm({title, name, children, textButton, onClose, isOpen}) {

  return ( 
    <div className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate>
          {children}
          <button className="popup__button" type="submit">{textButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
