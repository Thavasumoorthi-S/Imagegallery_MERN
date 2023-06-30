import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import { useState } from 'react';
import  Userscontext  from './userscontext';
import axios from 'axios';

function App() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');



  return (
      <Userscontext.Provider value={{name,email,password,setname,setemail,setpassword}}>
      <Router>
      <Routes>
        <Route exact path='/' element={<Register/>} />
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/home' element={<Home />}/>
      </Routes>
      </Router>
      </Userscontext.Provider>
  );
}

export default App;
