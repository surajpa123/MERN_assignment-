import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Merchant } from './pages/Merchant'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home/>} />

        <Route path="/merchantDashboard" element={<Merchant/>} />
      </Routes>
      
    </BrowserRouter>
    
    </>
  )
}

export default App
