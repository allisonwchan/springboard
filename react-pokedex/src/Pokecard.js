import React from 'react';
import './Pokecard.css';

const IMAGE_BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const Pokecard = (props) => {
    let imageUrl = `${IMAGE_BASE_URL}/${props.id}.png`;

    return (
        <div className="Pokecard">
            <div className="Pokecard-title">{props.name}</div>
            <img className="Pokecard-image" src={imageUrl} alt={props.name} />
            <div className="Pokecard-data">Type: {props.type}</div>
            <div className="Pokecard-data">EXP: {props.exp}</div>
        </div>
    )
}

export default Pokecard;