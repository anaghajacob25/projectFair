import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import titleimage from '../assets/head.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { HomeProjectAPI } from '../services/allAPI'


function Home() {
  const [isLogin,setIslogin]=useState(false)
  const [Project,setProject]=useState([])

  useEffect(()=>{
     if(sessionStorage.getItem("token")){
         setIslogin(true)
     }
  },[])

  const getHomeProject=async()=>{
    const result=await HomeProjectAPI()
    setProject(result.data);
  }

  console.log(Project);

  useEffect(()=>{
    getHomeProject()
  })

  return (
    <>
      <div style={{ width: '100%' }} >
        <div className='container-fluid rounded bg-primary'>
          <Row className='align-items-center p-5 '>
            <Col sm={12} md={6}>
              <h1><FontAwesomeIcon icon={faStackOverflow} className='me-2 fs-2' />Project Fair</h1>
              <p className='mt-3 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quisquam architecto commodi corporis cupiditate dignissimos vel praesentium! Veniam, dolore beatae numquam itaque reiciendis, explicabo alias consectetur nisi asperiores doloremque quis.</p>
         {isLogin?      <Link to={'/dashboard'}>
                <button className='btn btn-warning mt-3'>Manage Project<FontAwesomeIcon icon={faArrowRight} /></button>
                </Link>  :
                <Link to={'/login'}>
                <button className='btn btn-warning mt-3'>Get start <FontAwesomeIcon icon={faArrowRight} /></button>
                </Link> }           
                 </Col>
            <Col sm={12} md={6}>
              <img src={titleimage} alt="image" className='w-75'  style={{marginTop:'100px'}}/>
            </Col>
          </Row>
        </div>

      </div>
      <div className='mt-5' >
        <h1 className='text-center'>Explore our Project</h1>
        <marquee scrollAmount={20}>
          <div className='d-flex mt-5 mb-5 w-100'>
          {Project?.length>0 ?<div className='row d-flex'>
            
             {Project.map((item)=>(<div className='col-md-4 mb-3 '> <ProjectCard pro={item}/></div>))}
             
           </div>:null}
          </div>
        </marquee>
        <div className='text-center mb-5 '>
        <Link to={'/project'} style={{fontWeight:'bold',fontSize:'17x',textDecoration:'none',color:"orange"}}>See More Project</Link>
        </div>
      </div>


    </>
  )
}

export default Home