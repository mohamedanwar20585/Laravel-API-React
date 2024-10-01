import { useContext, useState } from "react";
import {AppContext}from "../Context/AppContext"
import {useNavigate } from "react-router-dom";

export default function CreatePost() {

    const navigate = useNavigate()

    const{token} = useContext(AppContext)

    const [formData, setFormData] = useState({
        title:'',
        body:''
    })

    const [errors, setErrors] = useState({})

    async function handleCreatePost(e){
        e.preventDefault()

        const res = await fetch('/api/posts',{
            method:'post',
            headers:{
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json()

        if (data.errors) {
            setErrors(data.errors)
        } else {
            navigate('/')
            console.log(data);
        }
    }

  return (
    <>
        <h1 className="title" >Create Post</h1>
        <form onSubmit={handleCreatePost} className="w-1/2 mx-auto space-y-4" >
            <div>
                <input type="text" placeholder="Name" value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} />
                {errors.title&&<p className="error" >{errors.title}</p>}
            </div>
            <div>
                <textarea rows="6" placeholder="Content Post" value={formData.body} onChange={e=>setFormData({...formData,body:e.target.value})}></textarea>
                {errors.body&&<p className="error" >{errors.body}</p>}
            </div>
            <button className="primary-btn">Create</button>
        </form>
    </>
  )
}
