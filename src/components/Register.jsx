import React from 'react'
import { Col, Form, Row, Button, Alert, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { registerAPI } from '../actions/userActions'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const { mutateAsync, isPending, isError, error ,isSuccess} = useMutation({
        mutationFn: registerAPI,
        mutationKey: ['registeration']
    })

    const validationSchema = Yup.object({
        username: Yup.string().required('username is required'),
        email: Yup.string()
            .email("invalid email")
            .required("email is required"),
        password: Yup.string()
            .min(5, "password must be minimum of 5 characters long")
            .required("password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"),null], "Password must match")
            .required("confirming your password is required")
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:'',
            username:''
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data)=>{
                    console.log('data', data)
                    navigate('/')
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
  return (
    <div className = 'h-2/3'>
        <Form 
            className = 'm-2 h-3/4'
            onSubmit={formik.handleSubmit}>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Email Address</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        id = 'email'
                        type = 'email'
                        placeholder = 'name@example'
                        onChange={formik.handleChange}
                        value = {formik.values.email}/>
                {formik.touched.email && formik.errors.email &&(
                <span>{formik.errors.email}</span>)}
                </Col>
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Username</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        id = 'username'
                        type = 'text'
                        placeholder = 'username'
                        onChange={formik.handleChange}
                        value = {formik.values.username}
                        />
                {formik.touched.username && formik.errors.username &&(
                <span>{formik.errors.username}</span>)}
                </Col>                
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Password</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        id = 'password'
                        type = 'password'
                        placeholder = 'password'
                        onChange={formik.handleChange}
                        value = {formik.values.password}/>
                {formik.touched.password && formik.errors.password &&(
                <span>{formik.errors.password}</span>)}
                </Col>
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Confirm password</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        id = 'confirmPassword'
                        type = 'password'
                        placeholder = 'confirm-password'
                        onChange={formik.handleChange}
                        value = {formik.values.confirmPasswordassword}/>
                {formik.touched.confirmPassword && formik.errors.confirmPassword &&(
                <span>{formik.errors.confirmPassword}</span>)}
                </Col>
            </Form.Group>
            <Button type = 'submit' className = 'w-full' variant = 'info'>Register</Button>
        </Form>
        {isPending && <Spinner animation = 'border' role = 'status'/>}
        {isError && <Alert variant = 'warning'>{error}</Alert>}
        {isSuccess && <Alert variant='success'>Success, please log in at homepage.</Alert>}
    </div>
  )
}
export default Register