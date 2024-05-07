import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <>
            <div className="row p-5 bg-primary" style={{color:'white'}}>
                <div className="col-md-4">
                    <h3> <FontAwesomeIcon icon={faStackOverflow} className='me-2 fs-2' />Project Fair</h3>
                    <p className='mt-3'>Lorem ipsum dolor, sit amet labornam doloremqo sapiente doloribus ad iste, iure eum sunt?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim cum eveniet eaque optio, commodi numquam, reprehende.</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                    <h3 >Links</h3>
                
                    <Link className='text-light' to={'/'}> <p className='mt-4'>Home</p></Link>
                       <Link className='text-light' to={'/login'}> <p>Login</p></Link>
                    <Link className='text-light' to={'/register'}><p>Register</p></Link>
                    
                    
                </div>
                <div className="col-md-2">
                    <h3 >Guides</h3>
                   
                        <p className='mt-4'>React</p>
                        <p>React-bootstrap</p>
                        <p>React-bootswatch</p>
                
                </div>
                <div className="col-md-3">
                    <h3>Contact Us</h3>
                    <div className='d-flex mt-4'>
                        <input type="text" className='form-control me-2 rounded shadow' placeholder='Enter Email-Id' />
                        <button className='btn btn-warning ms-3'>Subscribe</button>
                    </div>
                    <div className='d-flex mt-4 fs-3 justify-content-between'>
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faLinkedin} />
                        <FontAwesomeIcon icon={faFacebook}  />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer