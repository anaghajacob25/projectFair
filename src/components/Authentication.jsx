import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI'
import { logoutResponseContext } from '../context/ContextShare'


function Authentication({register}) {

    const {authorToken,setauthorToken}=useContext(logoutResponseContext)

    //state to store data
    const [userData,setUserData]=useState({
        username:"",
        email:"",
        password:""
    })
    console.log(userData);

    const  navigate =useNavigate()

    const RegisterForm=register?true:false


    // function to register an user
    const handleRegister=async(e)=>{
        // in order to prevent data lost
        e.preventDefault()
        const {username,email,password}=userData

        if(!username || !email ||!password){
            toast.info('please fill the form completely')
        }else{
            // api call
         const result=   await registerAPI(userData)
         console.log(result);
            // toast.success('proceed')
            if(result.status==200){
                toast.success('Registration successfull')
                setUserData({
                    username:"",
                    email:"",
                    password:"" 
                })
                navigate('/login')
            }else{
                toast.error(result.response.data)
            }

        }

    }

    //function to login
    const handleLogin=async(e)=>{
           e.preventDefault()

           const {email,password}=userData

           if(!email || !password){
            toast.info("Please fill the form compeletely")
           }else{
          const result=  await loginAPI(userData)
          console.log(result);

          if(result.status==200){
            //adding data to session storage
            sessionStorage.setItem("existingUser",JSON.stringify(result.data.existinguser))
            sessionStorage.setItem("token",result.data.token)
            toast.success('Login Successfull')
            setauthorToken(true)
            setUserData({
                username:'',
                email:'',
                password:''
            })

            setTimeout(() => {
                navigate('/')
            },2000);
          }
           }
    }



  return (
    <>

    <div className='w-100 d-flex justify-content-center align-items-center mb-5'>

     <div className=' w-75 '>
       <Link to={'/'} style={{textDecoration:'none',color:'white'}}> <h5 className='mb-3'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back to Home</h5></Link>
        <div className=' p-md-5 rounded shadow bg-primary' >
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img className='w-100 p-4' src="http://elitetechnocrats.com/images/software_devlopment.gif" height={'300px'} alt="" />
                </div>
                <div className="col-md-6 mt-4 mt-md-0 d-flex justify-content-center align-items-center flex-column">
        <h2><FontAwesomeIcon className='me-3 fs-1' icon={faStackOverflow} />Project Fair</h2>

        <h5 className='mt-3 '>
            {
                RegisterForm?'Sign Up to Your Account':'Sign In to Your Account'
            }
        </h5>

        <form className='mt-5 w-100 p-5'>
       { RegisterForm && <input type="text" placeholder='Enter Username' className='form-control' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>}
            <input type="text" placeholder='Enter Email id' className='form-control mt-3' value={userData.email}  onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
            <input type="text" placeholder='Enter Password' className='form-control mt-3'  value={userData.password}  onChange={(e)=>setUserData({...userData,password:e.target.value})}/>

            { RegisterForm? <div>
               <button onClick={handleRegister} className='btn btn-warning mt-4 w-100'>Register</button>
                <p  className=' mt-2'>Already a User? click Here to <Link to={'/login'} style={{color:'red',textDecoration:'none'}}    >Login</Link></p>
           </div>:
           <div>
                <button className='btn btn-warning mt-4 w-100' onClick={handleLogin}>Login</button>
                <p className=' mt-2'>New User? click Here to <Link to={'/register'} style={{color:'red',textDecoration:'none'}}>Register</Link></p>
           </div> }
        </form>
                </div>
            </div>

        </div>

     </div>
    </div>
    <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Authentication