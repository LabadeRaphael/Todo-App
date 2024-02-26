import logo from './logo.svg'
import './App.css'
import DisplayTodo from './component/DisplayTodo'
import { useEffect, useState } from 'react'

const App = () => {
  const [singleTodo, setsingleTodo] = useState('')
  const [allTodo, setallTodo] = useState([])
  const [checkInput, setcheckInput] = useState(true)
  const [singleTodoAddAlert, setsingleTodoAddAlert] = useState(false)
  const [singleTodoDeleteAlert, setsingleTodoDeleteAlert] = useState(false)
  const [singleTodoEditAlert, setsingleTodoEditAlert] = useState(false)
  const [disableBtn, setdisableBtn] = useState(true)
  const [updateSerialNum, setupdateSerialNum] = useState(0)
  const [deleteSerialNum, setdeleteSerialNum] = useState(0)

  useEffect(() => {
    if (localStorage.allTodo) {
      let localStoredTodo = JSON.parse(localStorage.allTodo)
      setallTodo(localStoredTodo)
    } else {
      setallTodo([])
    }
  }, [])
  const getInputHandler = e => {
    setsingleTodo(e.target.value)
    setsingleTodoAddAlert(false)
    setcheckInput(false)
    {
      singleTodo == ' ' ? setdisableBtn(true) : setdisableBtn(false)
    }
    setsingleTodoDeleteAlert(false)
  }

  const addTodoHandler = () => {
    if (singleTodo == '') {
      setcheckInput(true)
      setsingleTodoAddAlert(false)
    } else {
      setallTodo(() => {
        let copyOfAllTodo = [...allTodo, singleTodo]
        localStorage.allTodo = JSON.stringify(copyOfAllTodo)
        return copyOfAllTodo
      })
      setsingleTodoAddAlert(true)
      setsingleTodo('')
      setcheckInput(false)
    }
    setsingleTodoEditAlert(false)
    setsingleTodoDeleteAlert(false)
    {
      singleTodo == '' ? setdisableBtn(true) : setdisableBtn(false)
    }
  }
  return (
    <div className='App'>
      {singleTodoAddAlert && (
        <div className='fw-bold bg-success col-lg-5 col-12 mx-auto text-light'>
          Todo Successfully Added
        </div>
      )}
      {singleTodoEditAlert && (
        <div className='fw-bold bg-success col-lg-5 col-12 mx-auto text-light'>
          {' '}
          Todo at serial number {updateSerialNum} Successfully Edited
        </div>
      )}
      {checkInput ? (
        <div
          className='alert-sm alert-danger fw-bold col-lg-5 col-12 mx-auto'
          role='alert'
        >
          Fill the input
        </div>
      ) : null}
      {singleTodoDeleteAlert && (
        <div className='fw-bold bg-success col-lg-5 col-12 mx-auto text-light'>
          Todo at serial number {deleteSerialNum} Successfully Deleted
        </div>
      )}

      <div className='fw-bold fs-2'>Todo-App</div>
      <div className='bg-info p-1 shadow-lg col-lg-5 mx-auto col-12'>
        <div className='d-flex'>
          <input
            type='text'
            className='form-control w-75'
            onChange={getInputHandler}
            value={singleTodo}
          />
          <button
            type='button'
            className='btn btn-dark ms-lg-2 btn-sm'
            disabled={disableBtn}
            onClick={addTodoHandler}
          >
            Add-Todo
          </button>
        </div>
      </div>
      {localStorage.allTodo && (
        <DisplayTodo
          changeAllTodo={setallTodo}
          getAddAlert={setsingleTodoAddAlert}
          getDeleteAlert={setsingleTodoDeleteAlert}
          getEditAlert={setsingleTodoEditAlert}
          getUpdateSN={setupdateSerialNum}
          getDeleteSN={setdeleteSerialNum}
          getCheckInput={setcheckInput}
        />
      )}
    </div>
  )
}

export default App
