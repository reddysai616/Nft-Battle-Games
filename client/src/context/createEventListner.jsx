import { ethers } from "ethers";
import { ABI } from "../contract";
import { playAudio, sparcle } from "../utils/animation";
import { defenseSound } from "../assets";
const emptyAccount = '0x0000000000000000000000000000000000000000';
const AddNewEvent = (eventFilter , provider , cb) =>{
    provider.removeListener(eventFilter);

    provider.on(eventFilter,(Logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(Logs);
    cb(parsedLog)
    })

}
const getcoords = (cardRef) => {
const {left , top , width ,height} = cardRef.current.getBoundingClientRect();

return {
    pageX: left + width/2,
    pageY: top + height/2.25,
}
}

export const createEventListner =({provider , walletAddress , contract , setShowAlert , navigate , setUpdateGameData , player1Ref ,player2Ref}) =>{
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

    const NewBattleMoves = contract.filters.BattleMove();
    AddNewEvent(NewBattleMoves, provider , ({args}) => {
       console.log('battleMoves')
    })

    const RoundedEventFilter = contract.filters.RoundEnded();
    AddNewEvent(RoundedEventFilter, provider , ({args}) => {
       console.log('battleMoves', args , walletAddress)
       for(let i=0 ; i < args.damagedPlayers.length ; i++) {
        if(args.damagedPlayers[i] !== emptyAccount){
if(args.damagedPlayers[i] === walletAddress){
    sparcle(getcoords(player1Ref))
}else if(args.damagedPlayers[i] !== walletAddress){
sparcle(getcoords(player2Ref))
}
        }else{
            playAudio(defenseSound)
           }

       }
       setUpdateGameData((prev) => prev+1) 

    })
}