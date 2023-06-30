import './Home.css'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRef} from 'react';
import Userscontext from './userscontext';
import { useContext } from 'react';
import { useLocation ,Link} from 'react-router-dom';

const  Home=()=>{

  const [data,setdata]=useState([]);
  const [images,setimage]=useState('')
  const [error,seterror]=useState('')
  const inputimage=useRef('')

const location=useLocation();
const param=new URLSearchParams(location.search);
const username=param.get('username')
const useremail=param.get('mail')

const {name,email,password,setname,setemail,setpassword}=useContext(Userscontext)

  const base=()=>{
     const reader=new FileReader();
     reader.readAsDataURL(inputimage.current.files[0]);
     reader.onload=()=>{
      console.log(reader.result)
      setimage(reader.result)
      seterror('')
     }
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/getitem?useremail=${useremail}`).then(item=>setdata(item.data)).catch(err=>console.log(err))
})

  const uploading= ()=>{
    if(images===''||images===null)
    {
      seterror("please select file and submit!!")
    }
    else{
     axios.post('http://localhost:8000/upload',{images,useremail}).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
  })

  }
  inputimage.current.value=null;
  setimage('')
  }

  return (
    <div className="App">
    {/* <span style={{float:'right'}}><Link  to='/'>LOGOUT</Link></span> */}
    <div className='header'>
    <Link className='links' to='/'>LOGOUT</Link>
    <div className='inside' >FAVORITE IMAGE GALLERY</div>
    <div className='inside' >WELCOME {username.toUpperCase()}</div>
     <div className='inside' ><input type="file" onChange={base} ref={inputimage} style={{marginLeft:'100px'}} name='images'/></div>
      <div className='inside'><button className='submitbtn' onClick={uploading}>UPLOAD</button></div>
      {
        error?(<div className='inside' style={{color:'black'}}>{error}</div>):(null)
      }

    </div>
    <div className='output'>
    {
    data.map(item=>{
      return(
          <img className='outputitem' src={item.images} alt="image" key={item._id} />
      )
    })
    }
    </div>

    </div>
  );
}

export default Home;
