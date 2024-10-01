import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams} from "react-router-dom";
import { AppContext} from "../Context/AppContext";

export default function ShowPost() {

    const {user, token} = useContext(AppContext)

    const {id} = useParams()
    const navigate = useNavigate()

    const[post, setPost] = useState(null)

    async function getPost(){
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()
        if(res.ok){
            setPost(data.post)
        }
        // console.log(data)
    }
    async function handleDelete(e){
        e.preventDefault()
        const res = await fetch(`/api/posts/${id}`,{
            method:'delete',
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data = await res.json()
        if(res.ok){
            navigate('/')
            console.log(data);

        }

    }
    useEffect(()=>{
        getPost()
    },[])
  return (
    <>
        {post

        ?    <div key={post.id} className="border border-dashed border-slate-400 rounded-md p-4 my-4 mx-3" >
                <div className="flex items-start justify-between" >
                    <div>
                        <h2 className="font-bold text-xl" >{post.title}</h2>
                        <small className="text-xs text-slate-400" > Create by {post.user.name} on {new Date(post.created_at).toLocaleString()} </small>
                    </div>

                </div>
                <p>{post.body}</p>
                {user&& post.user_id == user.id&&
                <div className="flex items-center justify-end gap-4" >
                    <Link to={`/update/${post.id}`} className="bg-green-800 hover:bg-green-600 text-white text-xs rounded-xl py-1 px-2 " >Update</Link>
                    <form onSubmit={handleDelete} >
                        <button className="bg-red-800 hover:bg-red-600 text-white text-xs rounded-xl py-1 px-2 ">Delete</button>
                    </form>
                </div>
                }
            </div>
        :<p className="title text-slate-500">There are no Posts!</p>
        }
    </>
  )
}


