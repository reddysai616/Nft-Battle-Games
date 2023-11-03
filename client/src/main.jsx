import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Home from './page/Home';
import { CreateBattle , Home, JoinBattles , Battle} from './page';
import './index.css';
import { GlobalContextProvider } from './context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalContextProvider>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-battle" element={<CreateBattle/>}/>
      <Route path="/join-battle" element={<JoinBattles/>}/>
      <Route path="/battle:battleName" element={<Battle/>}/>


    </Routes>
  </GlobalContextProvider>
 
  </BrowserRouter>,
);
