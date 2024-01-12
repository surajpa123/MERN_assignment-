import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Merchant } from './pages/Merchant'
import { PrivateRoute } from './components/PrivateRoute'
import { EditProduct } from './pages/EditProduct'
import { MerchantProdView } from './pages/MerchantProdView'
import { Header } from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>

    <Header/>

      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<Home/>} />


        <Route element = {<PrivateRoute/>}>



        <Route path='/merchantProdView' element = {<MerchantProdView/>}></Route>

        <Route path='/edit/:id' element = {<EditProduct/>}></Route>

        <Route path="/merchantDashboard" element={<Merchant/>} />

        </Route>
      </Routes>
      
    </BrowserRouter>
    
    </>
  )
}

export default App
