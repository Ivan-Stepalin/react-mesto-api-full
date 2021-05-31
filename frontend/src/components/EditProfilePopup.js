import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
   
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.open]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    };

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    };

    return (
        <PopupWithForm name='title' title='Редактировать профиль' submitText='Сохранить' isOpened={props.isOpened} onClose={props.onClose} onSubmit={handleSubmit}>
            <input value={name || ''} onChange={handleChangeName} name="name" type="text" id="name-title" placeholder='Ваше Имя' className="popup__field popup__field_value_name" minLength="2" maxLength="40" required noValidate />
            <span id="name-title-error" className="popup__error" />
            <input value={description || ''} onChange={handleChangeDescription} name="about" type="text" id="job-title" placeholder='Коротко о себе' className="popup__field popup__field_value_job" minLength="2" maxLength="200" required noValidate />
            <span id="job-title-error" className="popup__error" />
        </PopupWithForm>
    )
}
export default EditProfilePopup;
