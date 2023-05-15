import SignIn from './pages/signin/SignInSide'
import SignUp from './pages/signup/SignUp'
import Landing from './pages/Landing/Landing'
import Home from './pages/home/Home'

import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return(
    <Routes>
      <Route path='/' element={<Landing/>}/> 
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/> 
      <Route path='/home' element={<Home/>}/>
    </Routes>
  )
}

export default App
