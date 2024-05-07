import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Dashboard from './Pages/Dashboard'
import Footer from './components/Footer'
import Authentication from './components/Authentication'
import { useContext } from 'react'
import { logoutResponseContext } from './context/ContextShare'

function App() {

  const {authorToken,setauthorToken}=useContext(logoutResponseContext)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/project' element={<Project />} />
        <Route path='/dashboard' element={authorToken?<Dashboard />:<Home/>} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/register' element={<Authentication register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App