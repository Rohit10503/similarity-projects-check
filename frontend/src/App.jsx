
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import SignUp from './pages/signup'
import Navbar from './component/navbar'
import Login from './pages/login'

function App() {


  return (
    <>
    <Navbar/> 
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
