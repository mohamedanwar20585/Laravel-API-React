import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";


export default function Layout() {
    const  navigation = useNavigate()
    const {user, token, setToken, setUser} = useContext(AppContext)

    async function handleLogout(e){
        e.preventDefault();

        const res = await fetch('/api/logout',{
            method:"post",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const data = await res.json()

        if(res.ok){
            localStorage.removeItem('token')
            setUser(null)
            setToken(null)
            navigation('/')
            console.log(data)
        }

    }
  return (
    <>
        <header>
            <nav>
                <Link to={'/'} className="nav-link" >home</Link>
                {user
                ? <div className="flex items-center space-x-4">
                    <p className="text-slate-400 text-xs" >Welcome Back {user.name}</p>
                    <Link to={'/create'} className="nav-link">New Post</Link>
                    <form onSubmit={handleLogout} >
                        <button className="nav-link">Logout</button>
                    </form>
                </div>
                :<div className="space-x-4" >
                    <Link to={'/register'} className="nav-link" >Register</Link>
                    <Link to={'/login'} className="nav-link" >Login</Link>
                </div>
                 }
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </>
  )
}
