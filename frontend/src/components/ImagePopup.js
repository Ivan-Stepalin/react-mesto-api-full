function ImagePopup(props) {
    let popupIsVisible;
    
    props.card ? popupIsVisible = `popup_opened` : popupIsVisible = ``;
    
    return (
        <div className={`popup popup_type_image ${popupIsVisible}`}>
            <div className="popup__box">
                <button type="button" aria-label="закрыть" className="popup__close-icon" onClick={props.onClose}/>
                <img className="popup__image" alt={props.name} src={props.card.link}/>
                <h2 className="popup__image-name">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;