import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
   const {setaddProjectResponse}=useContext(addProjectResponseContext)

    const [show, setShow] = useState(false);
    const [token,setToken]=useState("")

    // state to hold the details of the project
    const [projectDetails,setProjectdetails]=useState({
      title:"",
      language:"",
      gitHub:"",
      website:"",
      overview:"",
      projectImage:""
    })

    // state to store the url of file
    const [preview,setPreview]=useState("")

    const [key,setKey]=useState(false)

    useEffect(()=>{
      projectDetails.projectImage &&
      setPreview(URL.createObjectURL(projectDetails.projectImage))
     //to convert the file into url
    },[projectDetails.projectImage])

    // function to reset
    const handleClose1=()=>{
      setProjectdetails({
        title:"",
        language:"",
        gitHub:"",
        website:"",
        overview:"",
        projectImage:""
      })

      setPreview("")
      setKey(!key)
    }

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[])

    // function to add project
    const handleAdd=async(e)=>{
      e.preventDefault()

      const {title,language,gitHub,website,overview,projectImage}=projectDetails
      if(!title || !language || !gitHub || !website || !overview || !projectImage){
              toast.info('Please fill the form completely')
      }else{
        // request body - formdata class object
        // if your request contains uploaded content the body have to send in formats of formdata
        // 1)create an object for formData class
        const reqBody=new FormData()
        // append()=add data to the body  but can add one item at a time
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",gitHub)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projectImage",projectImage)
      
        
        
        // request header
        if(token){
        const reqHeader={
          'Content-Type':'multipart/form-data',
          'Authorization':`Bearer ${token}`  //bearer - no other credential/document is required to verify the request holder
        }
      
        // call api
        const result=await AddProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
           toast.success('project uploaded succesfully')
           handleClose()
           setaddProjectResponse(result.data)




        }else{
          toast.error('project upload failed')
        }

      }
      

      }
    }




      console.log(projectDetails);
    const handleClose = () => {setShow(false)
    handleClose1()};
    const handleShow = () => setShow(true);
  return (
    <>
    <div>
        <button className='btn btn-success' onClick={handleShow}>Add Project</button>
    </div>
    <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-md-6 p-3">
                    <label htmlFor="img">
                        <input type="file" name="" key={key} id="img" style={{display:'none'}} onChange={(e)=>setProjectdetails({...projectDetails,projectImage:e.target.files[0]})} />
                        <img src={preview?preview:"https://images.pexels.com/photos/2179205/pexels-photo-2179205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt=""  className='w-100' />
                    </label>
                </div>
                <div className="col-md-6 p-3">
                      <div className='mt-3 mb-3'>
                        <input type="text" placeholder='Project Title' value={projectDetails.title} className='form-control' onChange={(e)=>setProjectdetails({...projectDetails,title:e.target.value})}/>
                      </div>
                      <div className='mt-3 mb-3'>
                        <input type="text" placeholder='Language' value={projectDetails.language} className='form-control' onChange={(e)=>setProjectdetails({...projectDetails,language:e.target.value})} />
                      </div>
                      <div className='mt-3 mb-3'>
                        <input type="text" placeholder='Github Link' value={projectDetails.gitHub} className='form-control' onChange={(e)=>setProjectdetails({...projectDetails,gitHub:e.target.value})}/>
                      </div>
                      <div className='mt-3 mb-3'>
                        <input type="text" placeholder='Website Link' value={projectDetails.website} className='form-control' onChange={(e)=>setProjectdetails({...projectDetails,website:e.target.value})} />
                      </div>
                      <div className='mt-3 mb-3'>
                        <textarea type="text" value={projectDetails.overview} placeholder='Overview'className='form-control' cols='30' rows='4' onChange={(e)=>setProjectdetails({...projectDetails,overview:e.target.value})}></textarea>
                      </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default AddProject


