import { useEffect, useState } from "react"
import { Link} from "react-router-dom";

export default function Home() {

    const[posts, setPosts] = useState([])

    async function getPosts(){
        const res = await fetch('/api/posts')
        const data = await res.json()
        if(res.ok){
            setPosts(data)
        }
        // console.log(data)
    }
    useEffect(()=>{
        getPosts()
    },[])
  return (
    <>
        <h1 className="title" >Latest Posts</h1>
        {posts.length > 0
        ?posts.map(post=>(
            <div key={post.id} className="border border-dashed border-slate-400 rounded-md p-4 mb-4 mx-3" >
                <div className="flex items-start justify-between" >
                    <div>
                        <h2 className="font-bold text-xl" >{post.title}</h2>
                        <small className="text-xs text-slate-400" > Create by {post.user.name} on {new Date(post.created_at).toLocaleString()} </small>
                    </div>
                    <Link to={`/show/${post.id}`} className="bg-blue-800 hover:bg-blue-600 text-white text-xs rounded-xl py-1 px-2 " >Read More</Link>
                </div>
                <p>{post.body}</p>
            </div>
        )) 
        :<p className="title text-slate-500">There are no Posts!</p>
        }
    </>
  )
}
