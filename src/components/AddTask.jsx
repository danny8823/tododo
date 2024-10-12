import React from 'react'
import { Col, Form, Row, Button,Spinner, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { createTodoAPI } from '../actions/todoActions'
import { useNavigate } from 'react-router-dom'

const AddTask = ({user}) => {
    const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
        mutationFn: createTodoAPI,
        mutationKey: ['create-todo']
    })
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            task: '',
            description: '',
            user
        },
        onSubmit: (values) => {
            mutateAsync(values)
                .then(() => {
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    })
  return (
    <div>
        <Form 
            className = 'm-2 h-3/4'
            onSubmit={formik.handleSubmit}>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Task</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        id = 'task'
                        onChange={formik.handleChange}
                        value = {formik.values.task}
                        type = 'text'/>
                </Col>
            </Form.Group>
            <Form.Group as = {Row} className = 'mb-2'>
                <Form.Label column sm = "3">Description</Form.Label>
                <Col sm = '9'>
                    <Form.Control
                        id = 'description'
                        type = 'text'
                        onChange={formik.handleChange}
                        value = {formik.values.description}/>
                </Col>                
            </Form.Group>
            <Button className = 'w-full' variant = 'info' type = 'submit'>Add</Button>
        </Form>
        {isPending && 
            <Spinner animation = 'border' role = 'status'/>}
            {isError && 
              <Alert variant='warning'>
                Error, {error}
              </Alert>
            }
            {isSuccess &&
              <Alert variant='success'>
                Success, refresh dashboard page to see new task.
              </Alert>
            }
    </div>
  )
}

export default AddTask