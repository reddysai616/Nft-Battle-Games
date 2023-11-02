import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider =({children}) =>{
    const [walletAddress , setWalletAddress] = useState();
   const [provider , setProvider] = useState('');
   const [contract, setContract] = useState('');
    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        });
        if(accounts) setProvider(accounts[0]);
    }
   useEffect(()=>{
    updateCurrentWalletAddress();
    window.ethereum.on('accountsChanged', updateCurrentWalletAddress);
   },[])

   useEffect(()=>{
    const setSmartContractAndProvider= async () => {
        const web3Model = new Web3Modal();
        const connection = await web3Model.connect();
        const newProvider = new ethers.providers.Web3Provider(connection);
        const signer = newProvider.signer();
        const newContract = new ethers.Contract(ADDRESS,ABI,signer);
        setProvider(newProvider);
        setContract(newContract);

    }
    setSmartContractAndProvider();
   },[])
    return (
        <GlobalContextProvider value={{
            contract , walletAddress
        }}>
{children}
        </GlobalContextProvider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext) 