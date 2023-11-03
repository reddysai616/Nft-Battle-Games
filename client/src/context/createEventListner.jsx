import { ethers } from "ethers";
import { ABI } from "../contract";

const AddNewEvent = (eventFilter , provider , cb) =>{
    provider.removeListener(eventFilter);

    provider.on(eventFilter,(Logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(Logs);
    cb(parsedLog)
    })

}

export const createEventListner =({provider , walletAddress , contract , setShowAlert , navigate , setUpdateGameData}) =>{
    const NewPlayerEventFilter = contract.filters.NewPlayer();

    AddNewEvent(NewPlayerEventFilter , provider , ({args}) =>{
        console.log("NewPlayerEventFilter" , args);
        if(walletAddress === args.owner) {
            setShowAlert({
                status:'true',
                type:'success',
                mesage:"Player has been successfully registered"
            })
        }
    });

    const NewBattleEventFilter = contract.filters.NewBattle();
    AddNewEvent(NewBattleEventFilter, provider , ({args}) => {
        if(walletAddress.toLowerCase()===args.player1.toLowerCase()|| walletAddress.toLowerCase() === args.player2.toLowerCase()){
            navigate(`/battle/${args.battleName}`)
        }
        setUpdateGameData((prev) => prev+1)
    })
}