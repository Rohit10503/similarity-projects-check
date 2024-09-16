
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import SignUp from './pages/signup'
import Navbar from './component/navbar'
import Login from './pages/login'
import CreateGroup from './pages/crreate_group'
import GroupProject from './pages/groups_prj'
import PrivateComponent from './Services/privateComponents'
import SelfGroup from './pages/self_group'
import Footer from './component/footer'

function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/> 
    <Routes>
      
      <Route element={<PrivateComponent />}>
      <Route path="/" element={<Home/>}/>
      <Route path="/create_group" element={<CreateGroup/>}/>
      <Route path="/view_groups" element={<GroupProject/>}/>
      <Route path='/self_group' element={<SelfGroup/>}/>
      </Route>


      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
