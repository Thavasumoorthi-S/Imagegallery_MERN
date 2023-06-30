import './Register.css'
import { useContext } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Userscontext from "./userscontext";
import axios from 'axios';
import {useRef} from 'react';

const Register = () => {

 const {name,email,password,setname,setemail,setpassword}=useContext(Userscontext)
 const navigate=useNavigate();
 const formref=useRef('')

 const handsubmit=(e)=>{
    e.preventDefault();
    console.log(name)
    console.log(email)
    console.log(password);

    axios.post('http://localhost:8000/setuser',{name,email,password}).then(user=>{
        console.log(user.data)
        navigate('/login')
    }).catch(err=>{
        console.log(err)
    })

    formref.current.reset()

 }
 

    return (

        <div className='register'>

            <form className='outers'  ref={formref} onSubmit={handsubmit}>
             <h2 className='inner'>REGISTER PAGE</h2>

            <div className="inner">
                <label>NAME:</label>
                <input name='name' type="text" onChange={(e)=>setname(e.target.value)} required/>

            </div>
            <div className="inner"> 
                <label>EMAIL:</label>
                <input name='email' type="text" onChange={(e)=>setemail(e.target.value)} required />

            </div>
            <div className="inner">
                <label>PASSWORD:</label>
                <input name='password' type="text"onChange={(e)=>setpassword(e.target.value)} required />

            </div>
            <div className="inner">
                <button type='submit'>SUBMIT</button>

            </div>
            <div className="inner">
                <p>ALREADY REGISTERED?</p>
                <Link className='link' to='login'>LOGIN PAGE</Link>

            </div>
            </form>
            
        </div>
    )
}

export default Register
