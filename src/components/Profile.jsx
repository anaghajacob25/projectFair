import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {  useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BASE_URL } from '../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileAPI } from '../services/allAPI';



function Profile() {
    const [open, setOpen] = useState(false);
    const [existingImage,setExistingImage]=useState("")
    const [preview,setPreview]=useState("")
    const [update,setUpdate]=useState(false)


    const [userProfile,setUserProfile]=useState({
      username:"",
      mailId:"",
      password:"",
      github:"",
      linkedin:"",
      profile:""
    })

    console.log(userProfile);

    useEffect(()=>{
      const user=JSON.parse(sessionStorage.getItem('existingUser'))
      setUserProfile({...userProfile,username:user.username,mailId:user.mailId,password:user.password,linkedin:user.linkedin,github:user.github})
    
      //if there is any uploaded image
      setExistingImage(user.profile)
    
    },[update])

    useEffect(()=>{

      userProfile.profile &&
      setPreview(URL.createObjectURL(userProfile.profile))

    },[userProfile.profile])

    console.log(preview);

    const handleUpdate=async(e)=>{
      e.preventDefault()

      const {username,mailId,password,github,linkedin,profile}=userProfile

      if(!github || !linkedin){
        toast.info('please fill the form compeletely')
      }
      else{
        const reqBody=new FormData()
        // append()=add data to the body  but can add one item at a time
        reqBody.append("username",username)
        reqBody.append("mailId",mailId)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        profile ?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
      


      const token=sessionStorage.getItem("token")


      if(preview){
        // uploads content
        const reqHeader={
          'Content-Type':'multipart/form-data',
          'Authorization':`Bearer ${token}`  //bearer - no other credential/document is required to verify the request holder
        }


        const result =await updateProfileAPI(reqBody,reqHeader)
        if(result.status==200){
          toast.success('Profile update successfully')
          setUpdate(true)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
      
      }else{
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }

        if(result.status==200){
          toast.success('Profile update successfully')
          setUpdate(true)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }
      }

      }
    
    }

  return (
    <>
    <div className='border p-4 rounded shadow'>
        <div className='d-flex justify-content-between'>
            <h3>Profile</h3>
            <button   onClick={() => setOpen(!open)} onMouseEnter={()=>setOpen(true)} className='btn btn-outline-info'>{open?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faChevronDown} />}</button>
        </div>

        <Collapse in={open}>
        <div className="row text-center mt-4">
              <label htmlFor="profile">
                <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})}/>
            { existingImage ==""?  
            <img src={preview?preview:"https://tse4.mm.bing.net/th?id=OIP.WpnGIPj1DKAGo-CP64znTwHaHa&pid=Api&P=0&h=180"} style={{width:'200px',height:'200px' ,borderRadius:'50%'}} alt="" className='mb-3'/>
              :
            <img src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} style={{width:'200px',height:'200px' ,borderRadius:'50%'}} alt="" className='mb-3' />}              </label>

              <div className="mb-3">
                <input type="text" placeholder='Github' value={userProfile.github} className='form-control' onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})}/>
              </div>

              <div className="mb-3">
              <input type="text" placeholder='LinkedIn' value={userProfile.linkedin} className='form-control' onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})}/>
              </div>

              <div className="mb-3">
                <button className='btn btn-success w-100' onClick={(e)=>handleUpdate(e)}>Update</button>
              </div>

        </div>
        </Collapse>

    </div>
    <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Profile