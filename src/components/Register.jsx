import React from 'react'
import { Col, Form, Row, Button, Modal } from 'react-bootstrap'

const Register = () => {
  return (
    <div className = 'h-2/3'>
        <Form className = 'm-2 h-3/4'>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Email Address</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        type = 'email'
                        placeholder = 'name@example'/>
                </Col>
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Username</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        type = 'text'
                        placeholder = 'username'/>
                </Col>                
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Password</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        type = 'password'
                        placeholder = 'password'/>
                </Col>
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Confirm password</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        type = 'password'
                        placeholder = 'confirm-password'/>
                </Col>
            </Form.Group>
            <Button className = 'w-full' variant = 'info'>Register</Button>
        </Form>
    </div>
  )
}

export default Register