import { createAction } from 'redux-act'

import { backendAdress, defaultFetchParams } from '../config'
import { parseResponse, handleMessage } from '../utils'


export const requestStudents = createAction('REQUEST STUDENTS')
export const receiveStudents = createAction('RECEIVE STUDENTS')
export const fetchStudents = () => dispatch => {
  dispatch(requestStudents())
  fetch(`${backendAdress}/students`,
    {
      ...defaultFetchParams,
      method: 'GET',
      credentials: 'include',
    })
  .then(parseResponse)
  .then(handleMessage(dispatch))
  .then(data => {
    dispatch(receiveStudents(data))
  })
}

export const addedNewStudent = createAction('ADDED NEW STUDENT')
export const addNewStudent = name => dispatch => (
  fetch(`${backendAdress}/students`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ name }),
  })
  .then(parseResponse)
  .then( data => Promise.resolve(data))
  .catch(err => {
    throw new Error(err)
  })
)

export const removeStudent = studentId => dispatch => (
  fetch(`${backendAdress}/students/${studentId}`, {
    ...defaultFetchParams,
    credentials: 'include',
    method: 'DELETE',
  })
  .then(() => Promise.resolve())
)
