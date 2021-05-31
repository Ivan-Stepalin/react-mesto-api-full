import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js"
import Header from './Header.js'
function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="container">
            <Header name={`Выйти`} onLogout={props.onLogout} link={'/sign-in'} email={props.email}/>
            <section className="profile">
                <div className="profile__avatar-place">
                    <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
                    <div className="profile__avatar-button" onClick={props.onEditAvatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__title-box">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button type="button" aria-label="редактирование" className="profile__edit-button" onClick={props.onEditProfile} />
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" aria-label="добавить" className="profile__add-button" onClick={props.onAddPlace} />
            </section>


            <section className="elements">
                {
                    props.card.map((item, i) =>
                        <Card
                            card={item}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                            key={i}
                        />
                    )
                }
            </section>

        </main>
    )
}

export default Main