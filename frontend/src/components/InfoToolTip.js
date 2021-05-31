import React from 'react';
import failed from '../images/failed.svg';
import success from '../images/success.svg';

function InfoToolTip(props) {
    let popupIsVisible;
    props.isOpened ? popupIsVisible = `popup_opened` : popupIsVisible = ``;

    return (
        <div className={`popup popup_type_${props.name} ${popupIsVisible}`}>
            <div className="popup__info">
                <button type="button" aria-label="закрыть" className="popup__close-icon" onClick={props.onClose} />
                <div className="popup__image-reg" style={{ backgroundImage: `url(${props.image ? success : failed})` }} />
                <p className="popup__text">{props.text}</p>
            </div>
        </div>
    )
}
export default InfoToolTip;