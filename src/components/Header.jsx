import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { logoutResponseContext } from '../context/ContextShare';


function Header() {

  const  {authorToken,setauthorToken}=useContext(logoutResponseContext)

  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setauthorToken(false)
    navigate('/')
  }

  return (
    <div>

<Navbar className='bg-primary'>
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}} >
          <Navbar.Brand href="#home" className=' fs-3 w-100 ' style={{fontWeight:'bold',textDecoration:'none',color:'white'}}>
          <FontAwesomeIcon  icon={faStackOverflow}   style={{textDecoration:'none',fontWeight:'bold',fontSize:'130%'}}/>{' '}
          
            Project fair

      
          </Navbar.Brand>

          </Link>
          <button onClick={handleLogout} className='btn btn-warning '>LogOut<FontAwesomeIcon icon={faPowerOff} /></button>

        </Container>
      </Navbar>
    </div>
  )
}

export default Header