import React from 'react'
import styles from '../styles'




const ActionButton = ({imgUrl , handleClick , resStyles}) => {
  return (
    <div className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${resStyles}`} onClick={handleClick} >
<img src={imgUrl} alt='action_img' className={styles.gameMoveIcon}/>      

    </div>
  )
}

export default ActionButton