import {React,useState,useEffect} from 'react'
import Login from './Components/Login/Login'
import Register from './Components/register/Register'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Landing from './Components/Landing/Landing'
import { Main } from './Components/main/Main';
import { Notes } from './Components/main/Notes';
import { Trash } from './Components/main/Trash';
import { Archive } from './Components/main/Archive';
const App = () => {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='main' element={<Main/>}>
                <Route path='notes' element={<Notes/>}/>
                <Route path='trash' element={<Trash/>}/>
                <Route path='archive' element={<Archive/>}/>
                <Route path='*' element={<Notes/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
