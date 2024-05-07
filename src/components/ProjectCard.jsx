import React from 'react'
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import photo from '../assets/head.png'
import { BASE_URL } from '../services/baseUrl';

function ProjectCard({pro}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
          <Card className='m-md-4 shadow p-3 w-100' onClick={handleShow} style={{ border: 'none' }}>
        <Card.Img variant="top" src={pro?`${BASE_URL}/uploads/${pro.projectImage}`:null} height={'200px'}/>
        <Card.Body>
          <Card.Title style={{ color: '#010b0e' }} className='text-center mt-2'>{pro.title}</Card.Title>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose} size='lg' className='rounded-shadow' >
        <Modal.Header closeButton className='' style={{ backgroundColor: 'whitesmoke', border: 'none' }}>
          <Modal.Title style={{ color: 'black', textDecoration: 'none' }}>{pro.title}</Modal.Title >
        </Modal.Header  >
        <Modal.Body className='' style={{ backgroundColor: 'whitesmoke', border: 'none' }}>
          <Row>

            <Col sm={12} md={6} className=''>
              <img src={pro?`${BASE_URL}/uploads/${pro.projectImage}`:null} alt="image" className='w-100' />

            </Col>
            <Col sm={12} md={6}>
              <h3 style={{ color: 'black' }}>Description :</h3>
              <p style={{ color: 'black' }} >{pro.overview}</p>
              <h3 style={{ color: 'black' }}>Technologies</h3>
              <p style={{ color: 'black' }}>{pro.language}</p>



            </Col>


          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'whitesmoke', border: 'none' }}>

        </Modal.Footer>

        <div className='me-auto mt-3 p-3' >

          <Link to={pro.github} target='_blank'><FontAwesomeIcon icon={faGithub} size='2xl' className='me-5' color='white' style={{ marginLeft: '1rem' }} /></Link>
          <Link to={pro.website} target='_blank'><FontAwesomeIcon icon={faLink} size='2xl' color='white' /></Link>

        </div>
      </Modal>
    </>
  )
}

export default ProjectCard