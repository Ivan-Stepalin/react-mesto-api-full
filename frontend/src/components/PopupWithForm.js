function PopupWithForm(props) {
    let popupIsVisible;
    props.isOpened ? popupIsVisible = `popup_opened` : popupIsVisible = ``;

    return(
        <div className={`popup popup_type_${props.name} ${popupIsVisible}`}>
            <form className={`popup__form popup__form_${props.name}`} onSubmit={props.onSubmit}>
                <button type="button" aria-label="закрыть" className="popup__close-icon" onClick={props.onClose}/>
                <h2 className="popup__name">
                    {props.title}
                </h2>
                    {props.children}
                <button type="submit" className={`popup__submit-button `}>{props.submitText}</button>
            </form>       
        </div>
    )
}

export default PopupWithForm;