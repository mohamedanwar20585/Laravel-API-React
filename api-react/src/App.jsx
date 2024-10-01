
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import CreatePost from './Post/CreatePost'
import ShowPost from './Post/ShowPost'
import UpdatePost from './Post/UpdatePost'

export default function App() {
    const {user} = useContext(AppContext)

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='/register' element={user?<Home/>:<Register/>}/>
                <Route path='/login' element ={user?<Home/>:<Login/>}/>
                <Route path='/create' element ={user?<CreatePost/>:<Login/>}/>
                <Route path='/show/:id' element ={<ShowPost/>}/>
                <Route path='/update/:id' element ={user?<UpdatePost/>:<Login/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

 App
