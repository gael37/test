import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'

import NotFound from './components/pages/NotFound'
import Home from './components/pages/Home'
import NavigationBar from './components/common/NavigationBar'
import WishList from './components/pages/profile/WishList'
import Orders from './components/pages/profile/Orders'
import ProductSingle from './components/pages/products/ProductSingle'
import ProductSingleUser from './components/pages/products/ProductSingleUser'
import EditProduct from './components/pages/products/EditProduct'
import DeleteProduct from './components/pages/products/DeleteProduct'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Profile from './components/pages/profile/Profile'
import EditProfile from './components/pages/profile/EditProfile'
import DeleteProfile from './components/pages/profile/DeleteProfile'
import ProductNew from './components/pages/products/ProductNew'
import EditProduct2 from './components/pages/products/EditProduct2'
import AreYouSure from './components/pages/profile/AreYouSure'


function App() {

  // state of the selected and the searched (used in the NavigationBar and the Home components)
  const [selected, setSelected] = useState('All')
  const [typed, setTyped] = useState('')


  return (
    <BrowserRouter>
      <NavigationBar selected={selected} typed={typed} setSelected={setSelected} setTyped={setTyped} />
      <Routes>
        <Route path="/" element={<Home selected={selected} typed={typed} setSelected={setSelected} setTyped={setTyped} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile/:userId" element={<EditProfile />} />
        <Route path="/delete-account" element={<DeleteProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/products/new" element={<ProductNew />} />
        <Route path="/products/:productId" element={<ProductSingle />} />
        <Route path="/products/:productId/:postcodeUser" element={<ProductSingleUser />} />
        <Route path="/edit-product/:productId" element={<EditProduct2 />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/delete-account" element={<DeleteProfile />} />
        <Route path="/are-you-sure" element={<AreYouSure />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )

}


export default App
