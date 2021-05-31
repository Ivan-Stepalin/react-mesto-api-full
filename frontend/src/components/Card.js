import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick(){
        props.onCardLike(props.card)
    }

    function handleDeleteClick(){
        props.onCardDelete(props.card)
    }

    const isOwn = props.card.owner === currentUser.id;

    const deleteButtonVisability = (
        `element__bracket ${isOwn ? `` : `element__bracket_disabled`}`
    )
        
    const isLiked = props.card.likes.some(i => i === currentUser.id);

    const cardLikeButtonClassName = (`element__group ${isLiked ? `element__group_active` : ``}`);

    return (
        <article className="element">
            <img className="element__image" alt={props.name} src={props.card.link} onClick={handleClick} />
            <button type="button" aria-label="корзина" className={deleteButtonVisability} onClick={handleDeleteClick}/>
            <div className="element__box">
                <h2 className="element__name" >{props.card.name}</h2>
                <div className="element__like-box">
                    <button type="button" aria-label="лайк" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <div className="element__group-count">{props.card.likes.length}</div>
                </div>
            </div>
        </article>
    )
}

export default Card