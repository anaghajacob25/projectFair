import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteUserProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import { Link } from 'react-router-dom'

function Myproject() {
  
  const {addProjectResponse}=useContext(addProjectResponseContext)
  const {editProjectResponse}=useContext(editProjectResponseContext)


  const [userproject,setUserproject]=useState([])

  const getUserProject=async()=>{
  const  token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

    const result=await userProjectAPI(reqHeader)
    console.log(result.data);

    if(result.status===200){
      setUserproject(result.data)
    }else{
      console.log(result.response.data);
    }
  }

  const handleDelete=async(id)=>{
    const  token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

    const result=await deleteUserProjectAPI(id,reqHeader)
    console.log(result);

    if(result.status==200){
      getUserProject()
    }else{
      console.log(result.response.data);
    }

  }

  useEffect(()=>{
     getUserProject()
  },[addProjectResponse,editProjectResponse])

  return (
    <>
    <div className="border shadow p-4 rounded">

      <div className="mt-4 d-flex">
        <h3>My Project</h3>
        <div className='ms-auto'>
         <AddProject/>
        </div>
      </div>

      <div className="mt-4">
     
    { userproject?.length>0?
    userproject?.map((item)=>(
      <div className="border bg-light  rounded p-2 mb-4 d-flex">
          <h5>{item.title}</h5>
          <div className='d-flex ms-auto'>
           <EditProject project={item}/>
           <button className='btn'><Link to={item.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success ms-3' /></Link></button>
           <button onClick={()=>handleDelete(item._id)} className='btn'><FontAwesomeIcon icon={faTrash} className='text-danger ms-3'/></button>
          </div>

        </div>
    )):

        <h5 className='text-warning mt-5'>No Project Added Yet......</h5>}


      </div>

    
    </div>
    </>
  )
}

export default Myproject