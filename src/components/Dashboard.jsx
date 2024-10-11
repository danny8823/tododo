import React, { useEffect, useState } from 'react'
import { Button, Modal} from 'react-bootstrap'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import AddTask from './AddTask';

const Dashboard = () => {
    const [value, setValue] = useState(new Date())
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    useEffect(() => {
        const interval = setInterval(()=> setValue(new Date()),1000)

        return () => {
            clearInterval(interval)
        }
    },[])

  return (
    <div className = 'w-screen flex flex-row'>
        <div className = 'w-6/12'>
            <div className = 'bg-blue-200 h-screen p-2'>
                <h1 className = 'text-center'>My todos</h1>
                <div className = 'flex justify-between'>
                    <span>List items will populate here</span>
                    <span>Delete</span>
                </div>
                
            </div>
        </div>
        <div className = 'w-6/12 h-screen m-auto bg-blue-100'>
            <h1 className = 'text-center'>Username will go here</h1>
            <Clock className = 'm-auto' value = {value}/><br/>
            <p className = 'text-center'>{value.toLocaleString()}</p>
            <div className = 'flex justify-around w-full'>
                <p className = 'bg-red-400 m-auto w-42 text-center rounded-md text-2xl p-2' onClick={handleOpen}>Add Task</p>
                <p className = 'bg-red-400 m-auto w-24 text-center rounded-md text-2xl p-2'>Logout</p>  
            </div>
        </div>
        <Modal size = 'lg' show = {show} onHide={handleClose} centered>
            <Modal.Header>
                Add task
            </Modal.Header>
            <Modal.Body>
                <AddTask/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>CLOSE</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Dashboard