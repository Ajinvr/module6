import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Header from './components/Header'
import Getstarted from './components/Getstarted'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <BrowserRouter>
            <Header/>
                 <Routes>
                      <Route path='/' element={<Getstarted/>}/> 
                      <Route path='/Home' element={<Home/>}/>      
                 </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App