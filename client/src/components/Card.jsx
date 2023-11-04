import React from 'react'
import { allCards } from '../assets'
import styles from '../styles';
const generateRandomCard = () => allCards[Math.floor(Math.random() *(allCards.length - 1))];
const img1= generateRandomCard();
const img2= generateRandomCard();
const Card = ({card , title , restStyles , cardRef, playerTwo}) => {
  return (
    <div className={`${styles.cardContainer} ${restStyles}`}>
        <img src={playerTwo? img2 : img1} alt="card" className={styles.cardImg} />
        

    </div>
  )
}

export default Card