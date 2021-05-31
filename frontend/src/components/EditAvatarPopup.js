import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm name='avatar-update' title='Обновить аватар' submitText='Сохранить' isOpened={props.isOpened} onClose={props.onClose} onSubmit={handleSubmit} >
            <input ref={linkRef} name="avatar" type="url" id="avatar-link" placeholder="ссылка на аватар" className="popup__field popup__field_value_avatar-link" required noValidate />
            <span id="avatar-link-error" className="popup__error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;