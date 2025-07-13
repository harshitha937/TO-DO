import React from 'react';
import {Routes,Route,BrowserRouter} from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login.jsx';
import ToDO from './pages/ToDo/ToDo';
import 'antd/dist/reset.css';

function App(){
  return(
    <>
   <BrowserRouter>
      <Routes>
         
               <Route path='/' element={<Landing/>} />
                <Route path='/register' element={<Register/>} />
                 <Route path='/login' element={<Login/>} />
                  <Route path='/todo' element={<ToDO/>} />
         
    </Routes>
    </BrowserRouter>
    
   
    </>
  )
};


export default App;