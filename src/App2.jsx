import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [task, setTask] = useState("")
  const [Tasks, setTasks] = useState([])
  const [eindex,setIndex] = useState(-1)
  const [editText,setEditText] = useState("")
   
  const HandleEdit = (index) =>{
    setIndex(index)
    // setEditText(Tasks[index])
    // const newTasks = [...Tasks]
    // newTasks[index] = task
    // setTasks(newTasks)
  }

  const HandleDelete = (index)=>{
    setTasks(Tasks.filter((_,i)=>i!==index))
    // const newTasks = [...Tasks]
    // newTasks.splice(index,1)
    // setTasks(newTasks)
  }
  const addItem = () => {
    if (task.trim() !== "") {
      setTasks([...Tasks, task])
      setTask("")
    }
  }

  const handleChange = (e) => {
    setTask(e.target.value)
  }
  
  const handleChange1 = (e,index) =>{
    // setEditText(e.target.value)
    const newTasks = [...Tasks]
    newTasks[index] = e.target.value
    setTasks(newTasks)
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input type="text" value = {task} onChange={handleChange} className="w-1/2" />
          <button onClick={addItem} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 ">Add</button>
        </div>

        <h2 className='text-xl font-bold'>Your Todos</h2>

        <div className="todos">
          {Tasks.map((t1,index) =>{
          return (<div key = {index} className="todo flex justify-between">
              <div className="text">
          {index!==eindex?(
                <input type="text" value = {t1} className='w-1/2'/>
          ):(<input type="text" value = {t1} onChange = {(e)=>handleChange1(e,index)} className='w-1/2'/>
          )}
              </div>
              <div className="buttons">
                <button onClick = {()=>HandleEdit(index)}className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 ">Edit</button>
                <button onClick = {()=>HandleDelete(index)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 ">Delete</button>
              </div>
            </div>
          )})}
        </div>

      </div>
    </>
  )
}

export default App
