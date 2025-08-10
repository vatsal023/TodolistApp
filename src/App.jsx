import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (items) => {
    localStorage.setItem("todos", JSON.stringify(items))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    ///first display it for edit
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    ///now delete the todo
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

    saveToLS(newTodos)
    ///another way of displaying the todo
    // let index = todos.findIndex(item => {
    //   return item.id === id;
    // })
    // setTodo(todos[index].todo)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim() !== "") {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
      setTodos(newTodos)
      setTodo("")
      saveToLS(newTodos)
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  // const handleCheckbox = (e)=>{
  //   let id = e.target.name;
  //   const newtodos = todos.map(todo=>
  //       todo.id === id?{...todo,isCompleted:!todo.isCompleted}:todo
  //  );    
  //  setTodos(newtodos)   

  // }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className = "font-bold text-center text-xl">iTask-Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2> 
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1" /> 
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md ">Save</button>
        </div>

        <input className = "my-4" onChange = {toggleFinished} type="checkbox" checked = {showFinished}/>Show Finished
        <h2 className='text-xl font-bold'>Your Todos</h2>

        <div className="todos"> 

          {todos.length === 0 && <div className='m-5'>No todos to display </div>}

          {todos.map(item => {

            return (showFinished||!item.isCompleted) && (<div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 ">Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 ">Delete</button>
              </div>
            </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App
