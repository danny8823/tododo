import React from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'

const AddTask = () => {
  return (
    <div>
        <Form className = 'm-2 h-3/4'>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Task</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        type = 'text'/>
                </Col>
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Description</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        type = 'text'/>
                </Col>                
            </Form.Group>
            <Button className = 'w-full' variant = 'info'>Add</Button>
        </Form>
    </div>
  )
}

export default AddTask