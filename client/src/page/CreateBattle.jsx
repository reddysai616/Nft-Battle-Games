import React, { useEffect, useState } from 'react'
import { CustomInput, GameLoad, PageHOC } from '../components'
import { useNavigate } from 'react-router-dom'
import styles from '../styles'
import {CustomButton} from '../components'
import { useGlobalContext } from '../context'



const CreateBattle = () => {
  const navigate = useNavigate();
  const {battleName , setBattleName , contract,gameData , setErrorMessage} = useGlobalContext();
  const [waitBattle , setWaitBattle] = useState(false);
useEffect(()=>{
  if(gameData?.activeBattle?.battleStatus === 1) {
    navigate(`/battle/${gameData.activeBattle.name}`)
  }
 else if(gameData?.activeBattle?.battleStatus===0){
    setWaitBattle(true);
  }
},[gameData])
// console.log( gameData?.pendingBattle[0] , 'test data')

  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;
    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error)
    }

  }
  
  return (
    <>
    {waitBattle && <GameLoad/>}
    <div className='flex flex-col mb-5'>
      <CustomInput
      value={battleName}
      label="Battle"
      placeholder="enter battle name"
      handleValueChange={setBattleName}
      />
      <CustomButton 
      handleClick={handleClick}
      title="create new battle"
      restStyles="mt-6"
      />

    </div>
        <p className={styles.infoText} onClick={()=>{
          navigate('/join-battle')
        }}>Or join already existing battles</p>
    </>
  )
}


export default PageHOC(
    CreateBattle,
    <>Create <br /> a new Battle</>,
  <>Create your own battle and wait for other players to join you</>,
  
  )