import React, { useEffect, useState } from 'react'
import { Button, Modal, Alert, Spinner } from 'react-bootstrap'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import AddTask from './AddTask';
import { getUserFromStorage } from '../utils/getUserFromStorage';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/slice/authSlice';
import { useQuery } from '@tanstack/react-query';
import { deleteTodoAPI, fetchTodoAPI } from '../actions/todoActions';

const Dashboard = () => {
    const [value, setValue] = useState(new Date())
    const [show, setShow] = useState(false)
    const [user, setUser] = useState()
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()

   
    const {data:tasks, isError, isLoading} =useQuery({
        queryFn: () => fetchTodoAPI(user?.id),
        queryKey: ['LIST-TODO', user?.id]
    })

    useEffect(() => {
        const user = getUserFromStorage()
        if(user) {
            setUser(user)
        } else {
            setUser('guest')
        }
        const interval = setInterval(()=> setValue(new Date()),1000)

        return () => {
            clearInterval(interval)
        }
    
    },[])

    const handleDel = async (id) => {
        await deleteTodoAPI(id)
        navigate('/dashboard')
    }

    const handleLogout = () => {
        dispatch(logoutAction())
        navigate('/')
    }

  return (
    <div className = 'w-screen flex flex-col-reverse sm:flex-row'>
        <div className = 'sm:w-6/12'>
            <div className = 'bg-blue-200 h-screen p-2'>
                <h1 className = 'text-center'>My Tasks</h1>
                <div className = 'flex flex-col'>
                    {tasks?.todo?.map((item) => (
                        <div key = {item._id} className = 'flex justify-between items-center h-16 w-full bg-white p-4 rounded-xl text-xl mb-2'>
                            <p className = 'm-0'>{item.task} - {item.description}</p>
                            <p className = 'm-0 text-red-700' onClick = {()=>handleDel(item._id)}>DEL</p>
                        </div>                       
                    ))}
                </div>
            </div>
        </div>
        <div className = 'w-screen sm:w-6/12 h-screen m-auto bg-blue-100'>
            <h1 className = 'text-center'>Welcome back, {user?.username}!</h1>
            <Clock className = 'm-auto' value = {value}/><br/>
            <p className = 'text-center'>{value.toLocaleString()}</p>
            <div className = 'flex justify-around w-full'>
                <p className = 'bg-red-400 m-auto w-42 text-center rounded-md text-2xl p-2' onClick={handleOpen}>Add Task</p>
                <p className = 'bg-red-400 m-auto w-24 text-center rounded-md text-2xl p-2' onClick={handleLogout} >Logout</p>  
            </div>
        </div>
        {isLoading && 
            <Spinner animation = 'border' role = 'status'/>}
        {isError && 
            <Alert variant='warning'>
            Error
            </Alert>
        }
        <Modal size = 'lg' show = {show} onHide={handleClose} centered>
            <Modal.Header>
                Add task
            </Modal.Header>
            <Modal.Body>
                <AddTask user = {user?.id}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>CLOSE</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Dashboard