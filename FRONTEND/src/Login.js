import React, { useState,useRef } from "react";
import './Login.css';
import Userscontext from "./userscontext";
import {useContext}  from "react";
import {useNavigate,Link} from 'react-router-dom';
import axios from "axios";

const Login = () => {

    const navigate=useNavigate()
   const {name,email,password,setname,setemail,setpassword}=useContext(Userscontext);
    const formref=useRef('')
    const [error,seterror]=useState('')

   const handleogin=async(e)=>{
    e.preventDefault();
    console.log(email)
    console.log(password)

    await axios.post('http://localhost:8000/checkuser',{email,password}).then(user=>{
        // setusername(user.data.name)
        
        // navigate(`/home?username=${user.data.name}`)
        if(password===user.data.password)
        {
            navigate(`/home?username=${user.data.name}&&mail=${user.data.email}`)
        }
        else{
            seterror("Incorrect Password!!")
            setTimeout(()=>{
                seterror('')
            },5000)
        }

        console.log(user.data)
    }).catch(err=>{
        seterror("Incorrect email and password")
        console.log(err);
        setTimeout(()=>{
            seterror('')
        },5000)
    })
    formref.current.reset()
    // navigate(`/home?name=${name}`)


 }
    
    return (

        <div>
            <form className="outer" ref={formref} onSubmit={handleogin}>
            <h2 className="inners">LOGIN PAGE</h2>
            <div className="inners"> 
                <label>EMAIL:</label>
                <input type="text" required onChange={(e)=>setemail(e.target.value)}/>

            </div>
            <div className="inners">
                <label>PASSWORD:</label>
                <input type="text"required onChange={(e)=>setpassword(e.target.value)}/>

            </div>
            <div className="inners">
                <button className="submitbtn" type="submit">SUBMIT</button>
            </div>
            <div className="inners">
            <Link className='link'to="/">REGISTER PAGE </Link>
            {
                error?(<h3>{error}</h3>):(null)
            }
            </div>
        
            </form>
            
            
        </div>
    )
}

export default Login
