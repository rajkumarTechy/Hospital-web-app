import React, { useEffect, useState } from 'react'
import logo from './logo.png'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Header = () => {

    const[auth,setAuth] = useState(false)
    const[name,setName] = useState('')
    
    const navigate = useNavigate()

    
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('https://hospital-web-app-2j3t.vercel.app')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setAuth(true)
                    setName(res.data.name); 
                    console.log(res.data.name)
                } else {
                    console.log(res.data.Message);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                
            });
    }, []);
    
    const handleLogout=()=>{
      axios.get('https://hospital-web-app-2j3t.vercel.app/logout')
      .then(res=>{
        localStorage.clear();
        navigate('/')
        window.location.reload(true)
      }).catch(err=>console.log(err))
    }

  return (
    <div>
      <div className="header">
            <div className="logo">
                <img src={logo} alt="Hospital Log"/>
                <div className="head-txt">
                    <h3>SRI KRISHNA <span>DIAGNOSTICS</span></h3>
                    <h5>95A, Ettayapuram Road, kovilpatti-628501</h5>
                </div>
            </div>
            {/* {auth ? (
            
            
            <div className="nav-bar">
              <h4>Welcome {name}</h4>
              <NavLink to='/' onClick={handleLogout}><h4>Logout</h4><FontAwesomeIcon className='icon' icon={faRightFromBracket} /></NavLink>
            </div>
            
            ):(
            <div className="nav-bar">
                
                <NavLink to='/login'><h4>login</h4><FontAwesomeIcon className='icon' icon={faUser} /></NavLink>
            </div>
              
          )} */}
        </div>
    </div>
  )
}

export default Header
