import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { allProjectAPI } from '../services/allAPI'
import { all } from 'axios'



function Project() {
  const [isToken,setToken]=useState(false)
  const [allproject,setAllproject]=useState([])
  const [searchkey,setSearchkey]=useState("")

  const getAllProject=async()=>{
    if(sessionStorage.getItem("token")){
      const token=sessionStorage.getItem("token")

      const regHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }

      const result=await allProjectAPI(searchkey,regHeader)
      // console.log(result);

      if(result.status==200){
        setAllproject(result.data)
      }else{
        console.log(result.response.data);
      }
    }
  }

  // console.log(allproject);
  console.log(searchkey);

  useEffect(()=>{
    getAllProject()
  },[searchkey])

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(true)
    }
  },[])
  
  return (
    <>
      <Header />

      <h2 className='text-center mt-5 mb-3' style={{ color: 'white', fontWeight: 'bold', fontSize: '39' }}> All Projects.</h2>

   {isToken?   <div className=' d-flex justify-content-center align-items-center flex-column w-100 ' style={{ backgroundColor: '' }}>


        <div className='row w-100'>

          <div className='col-md-4'></div>

          <div className='col-md-4 d-flex justify-content-center align-items-center p-4'>

            <input type="text" onChange={(e)=>setSearchkey(e.target.value)} className='form-control  mt-4 mb-5' placeholder='Search By Technologies' />
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: '-35px', marginTop: '-20px', color: 'black' }} />

          </div>

          <div className='col-md-4'></div>

        </div>

        <Row className='container-fluid mb-5  '>

         {allproject?.length>0?

         allproject?.map((item)=>(
          <Col sm={12} md={6} lg={4} >
            <ProjectCard pro={item}/>
          </Col>
          )):
          <p>no projects</p>
          }

     

        </Row>

      </div>
:
      <div className='d-flex justify-content-center align-items-center flex-column mb-5 mt-4'>
        <img src=" https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="lock"
          style={{ width: '200px' }} />
        <h3 className='text-center mt-5' style={{ fontWeight: 'bold', color: 'whitesmoke' }}>Please <span className='text-primary'><Link to={'/login'} style={{textDecoration:"none"}}>Login</Link></span> To See More Projects !</h3>


      </div>
}
     

    </>
  )
}

export default Project