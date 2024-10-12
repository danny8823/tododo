import React, { useState } from 'react'
import { Form, Button, Modal, Spinner,Toast } from 'react-bootstrap'
import Register from './Register'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { loginAction } from '../redux/slice/authSlice'
import { loginAPI } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {mutateAsync, isPending, isError, isSuccess} = useMutation({
    mutationFn: loginAPI,
    mutationKey: ['login']
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data)=> {
          console.log('data', data)
          dispatch(loginAction(data))
          localStorage.setItem('userInfo', JSON.stringify(data))
          navigate('/dashboard')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })

  return (
    <div className = 'w-screen h-screen flex flex-col justify-center items-center'>
            <Form 
              className = 'bg-slate-300 p-4 h-2/4 md:w-2/4 lg:w-2/3 rounded-lg shadow-inner'
              onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label className = 'sm:text-sm md:text-3xl'>Email address</Form.Label>
                    <Form.Control 
                        id = 'email'
                        className = ' mb-4'
                        size = 'lg' 
                        type="email" 
                        placeholder="name@example.com" 
                        onChange={formik.handleChange}
                        value = {formik.values.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className = 'sm:text-sm md:text-3xl'>Password</Form.Label>
                    <Form.Control 
                        id = 'password'
                        className = ' mb-4'
                        size = 'lg' 
                        type="password" 
                        placeholder="password" 
                        onChange={formik.handleChange}
                        value = {formik.values.password}/>
                </Form.Group>
                <Button className = 'w-full'variant="light" type = 'submit'>Login</Button>
            </Form>
            {isPending && 
            <Spinner animation = 'border' role = 'status'/>}
            {isError && 
              <Toast>
                <Toast.Header>ERROR</Toast.Header>
                <Toast.Body>Ooops there was an error please try again.</Toast.Body>
              </Toast>
            }
            {isSuccess &&
              <Toast>
                <Toast.Header>SUCCESS</Toast.Header>
                <Toast.Body>Login successful</Toast.Body>
              </Toast>
            }
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