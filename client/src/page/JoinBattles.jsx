import React from 'react'
import { PageHOC ,CustomButton } from '../components'
import styles from '../styles'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'

const JoinBattles = () => {
  const navigate = useNavigate();
  const {gameData , contract ,setShowAlert,walletAddress,setBattleName } = useGlobalContext();
 
 const handleClick = async (battlename) => {
  setBattleName(battlename);
  // if(!battle === '' && battle.trim() === '') return null;
  try {
    await contract.joinBattle(battlename)
    setShowAlert({
      status:true,
      type:'success',
      message:`Joining ${battlename}`
    })
  } catch (error) {
    setShowAlert({
      status:true,
      type:'failure',
      message:`unable to join ${battlename}`
    })
  }
 }
  return (
    <>
    <h2 className={styles.joinHeadText}> Avaliable Battles:</h2>
    <div className={styles.joinContainer}>
      {gameData.pendingBattles.length  ? 
      gameData.pendingBattles
      .filter((battle) => !battle.players.includes(walletAddress))
      .map((battle,index)=>(
        <div className={styles.flexBetween} key={battle.name+index}>
          <p className={styles.joinBattleTitle}>{index+1}. {battle.name}</p>
    <CustomButton 
        title='join'
        handleClick={() => handleClick(battle.name)}
        />
          
        </div>
      )) :  
    <p className={styles.joinLoading}>Reload the page to see new battles</p> 
      
     }
  
    </div>
    <p className={styles.infoText} onClick={()=>{
      navigate('/create-battle')
    }}> or create new  battles</p>
      
    </>
  )
}

export default PageHOC(
  JoinBattles,
<>Join <br/> a Battle</>,
<>Join already existing Battle</>
)