import React from 'react'
import { useState } from 'react'

const DisplayTodo = props => {
  const [editIndex, seteditIndex] = useState(0)
  const [editInput, seteditInput] = useState('')
  const [editItem, seteditItem] = useState('')
  const {
    changeAllTodo,
    getDeleteAlert,
    getAddAlert,
    getEditAlert,
    getUpdateSN,
    getDeleteSN,
    getCheckInput
  } = props
  let getAllTodo = JSON.parse(localStorage.allTodo)

  const deleteHandler = (item, ind) => {
    if (localStorage.allTodo) {
      let filterAllTodo = getAllTodo.filter((item, index) => ind !== index)
      localStorage.allTodo = JSON.stringify(filterAllTodo)
      changeAllTodo(filterAllTodo)
      getAddAlert(false)
      getEditAlert(false)
      getDeleteSN(ind + 1)
    }
    if (getAllTodo.length < 2) {
      getDeleteAlert(false)
    } else {
      getDeleteAlert(true)
    }
  }
  const editHandler = (item, ind) => {
    seteditIndex(ind)
    seteditItem(item)
  }
  const editInputHandler = e => {
    seteditItem(e.target.value)
    seteditInput(e.target.value)
  }
  const updateHandler = editInd => {
    if (localStorage.allTodo) {
      let copyOfAllTodo = [...getAllTodo]
      copyOfAllTodo[editInd] = editInput
      getAllTodo.filter((item, index) => {
        if (editInd == index) {
          getAllTodo[index] = editInput
          localStorage.allTodo = JSON.stringify(getAllTodo)
          changeAllTodo(getAllTodo)
          seteditInput('')
          getUpdateSN(index + 1)
        }
      })
      getEditAlert(true)
      getAddAlert(false)
      getDeleteAlert(false)
      getCheckInput(false)
    }
  }

  return (
    <div className='col-lg-5 col-12 mx-auto'>
      <table className='table table-bordered border-info table-sm'>
        <thead>
          {getAllTodo.length > 0 && (
            <tr className=''>
              <th scope='col'>S/N</th>
              <th scope='col'>Todo Item</th>
              <th scope='col'>Edit Todo</th>
              <th scope='col'>Delete Todo</th>
            </tr>
          )}
        </thead>
        <tbody>
          {getAllTodo.length > 0 &&
            getAllTodo.map((eachTodo, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{eachTodo}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-sm btn-warning bg-warning text-light'
                    data-bs-toggle='modal'
                    data-bs-target='#staticBackdrop'
                    onClick={() => editHandler(eachTodo, index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-sm btn-danger bg-danger'
                    onClick={() => deleteHandler(eachTodo, index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>
                Edit-Todo
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={editItem}
                onChange={editInputHandler}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => updateHandler(editIndex)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayTodo
