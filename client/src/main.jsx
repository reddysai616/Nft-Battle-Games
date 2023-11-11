import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Home from './page/Home';
import { CreateBattle , Home, JoinBattles , Battle, BattleGround} from './page';
import './index.css';
import { GlobalContextProvider } from './context';
import { OnboardModal } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalContextProvider>
    <OnboardModal/>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-battle" element={<CreateBattle/>}/>
      <Route path="/join-battle" element={<JoinBattles/>}/>
      <Route path="/BattleGround" element={<BattleGround/>}/>

      <Route path="/battle/:battleName" element={<Battle/>}/>


    </Routes>
  </GlobalContextProvider>
 
  </BrowserRouter>,
);
