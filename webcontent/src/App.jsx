import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import PriceProductPage from './components/PriceProductPage';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Scraping from './components/Scraping';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='' element= { <HomePage />} />
        <Route path="/category/:categoryId/:name" element={<ProductPage/>} />
        <Route path="/prices/:categoryId/:productId" element={<PriceProductPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scraping" element={<Scraping />} />
      </Routes>
        
    </div>
  )
}

export default App
