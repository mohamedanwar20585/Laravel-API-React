import { useContext, useEffect, useState } from "react";
import {AppContext}from "../Context/AppContext"
import {useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {

    const navigate = useNavigate()

    const{id} = useParams()

    const{token, user} = useContext(AppContext)

    const [formData, setFormData] = useState({
        title:'',
        body:''
    })

    const [errors, setErrors] = useState({})

    async function getPost(){
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()
        if(res.ok){
            if(data.post.user_id !== user.id){
                navigate('/')
            }
            setFormData({
                title:data.post.title,
                body:data.post.body,
            })
        }
        // console.log(data)
    }
    useEffect(()=>{
        getPost()
    },[])

    async function handleUpdatePost(e){
        e.preventDefault()

        const res = await fetch(`/api/posts/${id}`,{
            method:'put',
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
            // console.log(data);
        }
    }

  return (
    <>
        <h1 className="title" >Update Post</h1>
        <form onSubmit={handleUpdatePost} className="w-1/2 mx-auto space-y-4" >
            <div>
                <input type="text" placeholder="Name" value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} />
                {errors.title&&<p className="error" >{errors.title}</p>}
            </div>
            <div>
                <textarea rows="6" placeholder="Content Post" value={formData.body} onChange={e=>setFormData({...formData,body:e.target.value})}></textarea>
                {errors.body&&<p className="error" >{errors.body}</p>}
            </div>
            <button className="primary-btn">Update</button>
        </form>
    </>
  )
}
