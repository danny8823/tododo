import React, { useState } from 'react'
import { Col, Form, Row, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Register from './Register'

const Home = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  return (
    <div className = 'w-screen h-screen flex flex-col justify-center items-center'>
            <Form className = 'bg-slate-300 p-4 h-2/4 w-2/4 rounded-lg shadow-inner'>
                <Form.Group>
                    <Form.Label className = 'text-2xl'>Email address</Form.Label>
                    <Form.Control 
                        className = 'mb-4'
                        size = 'lg' 
                        type="email" 
                        placeholder="name@example.com" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className = 'text-2xl'>Password</Form.Label>
                    <Form.Control 
                        className = 'mb-4'
                        size = 'lg' 
                        type="password" 
                        placeholder="password" />
                </Form.Group>
                <Button className = 'w-full'variant="light">Login</Button>
            </Form>
            <small className = 'text-blue-500 w-full text-center'>Don't have an account? <span className = 'text-blue-700' onClick={handleOpen}>Register Here</span></small>
            <Modal size = 'lg' show = {show} onHide={handleClose} centered>
              <Modal.Header>
                <h1>Register</h1>
              </Modal.Header>
              <Modal.Body>
                <Register/>
              </Modal.Body>              
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
            </Modal.Footer>
            </Modal>        
    </div>
  )
}

export default Home