import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';


import { ABI, ADDRESS } from '../contract';
import {createEventListner} from './createEventListner';


const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [showAlert, setShowAlert] = useState({status:false,message:'',type:'info'});
  const [battleName , setBattleName] = useState('');
const [gameData , setGameData] = useState({
  players:[], pendingBattles:[], activeBattle:null
})
const [updateGameData, setUpdateGameData] = useState(0);

const [battleGround , setBattleGround] = useState('bg-astral');
  const navigate = useNavigate();





  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWalletAddress();

    window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  }, []);

  //* Set the smart contract and provider to the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);
useEffect(()=>{
  if(contract){
    createEventListner({provider , walletAddress , contract,setShowAlert , navigate})
  }
},[contract])

useEffect(()=>{
    if(showAlert?.status){
        const timer = setTimeout(()=>{
            setShowAlert({status:false,type:'info',message:''})

        },[5000])

        return ()=> clearTimeout(timer)
    }

},[setShowAlert])

// get the game data of all the battles
useEffect(()=>{
const fetchGameData = async () =>{

  const fetchBattleData = await contract.getAllBattles();
  const pendingBattles = await fetchBattleData.filter((battle) => battle.battleStatus === 0)
  let activeBattle = null;

  fetchBattleData.forEach((battle) => {
    if(battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
      if(battle.winner.startsWith('0x00')){
        activeBattle=battle;
      }
    }
  })

setGameData({pendingBattles: pendingBattles.slice(1), activeBattle})


}
if(contract) fetchGameData();
},[contract , updateGameData])
  return (
    <GlobalContext.Provider
      value={{
       
        contract,
        walletAddress,
        setShowAlert,
        showAlert,
        battleName,
        setBattleName,
        gameData,
        setUpdateGameData,
        setBattleGround,
        battleGround,


      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);