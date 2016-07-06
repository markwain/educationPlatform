import {createAction} from 'redux-act'

import { backend, defaultFetchParams } from '../config'
import { parseJSON } from '../utils'


export const openNewGroupPopup = createAction('SHOW NEW GROUP POPUP')
export const closeNewGroupPopup = createAction('CLOSE NEW GROUP POPUP')
export const setGroupPopupStep = createAction('SET GROUP POPUP STEP')

export const requestCreateGroup = createAction('REQUEST CREATE GROUP')
export const receiveCreatedGroup = createAction('RECEIVE CREATED GROUP')
export const createGroup = (name, method) => dispatch => {
  dispatch(requestCreateGroup())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/groups`, {
    ...defaultFetchParams,
    method,
    mode: 'cors',
    credentials:'include',
    body: JSON.stringify({ name })
  }).then(parseJSON)
    .then(res => {
      console.log('New-created group data: ', res)
      dispatch(receiveCreatedGroup(res))
  }).catch( err => {throw new Error(err)} )
}

export const requestFetchGroup = createAction('REQUEST FETCH GROUP')
export const receiveFetchedGroup = createAction('RECEIVE FETCHED GROUP')
export const fetchGroup = name => dispatch => {
  dispatch(requestFetchGroup())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/groups`, {
    ...defaultFetchParams,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(parseJSON)
    .then( res => {
      dispatch(receiveFetchedGroup(res[0]))
  })
    .catch( err => {throw new Error(err)} )
}

export const requestSetChosenSubject = createAction('REQUEST SEND CHOSEN SUBJECT')
export const appliedChosenSubject = createAction('APPLIED CHOSEN SUBJECT')
export const sendChosenSubject = (subject, method) => dispatch => {
  dispatch(requestSetChosenSubject())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/subjects`, {
    ...defaultFetchParams,
    method,
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ ...subject })
  }).then( parseJSON )
    .then( res => {
      dispatch(appliedChosenSubject(res))
    })
}

export const requestSubjectsList = createAction('REQUEST SUBJECTS LIST')
export const receiveSubjectsList = createAction('RECEIVE SUBJECTS LIST')
export const fetchSubjectsList = (parentResolve, parentReject) => dispatch => {
  dispatch(requestSubjectsList())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/subjects`, {
    ...defaultFetchParams,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(parseJSON)
    .then( res => {
      parentResolve && parentResolve()
      dispatch(receiveSubjectsList(res))
  }).catch( err => {
      parentReject && parentReject()
      throw new Error(err)
  })
}

export const requestStudentsList = createAction('REQUEST STUDENTS LIST')
export const receiveStudentsList = createAction('RECEIVE STUDENTS LIST')
export const fetchStudentsList = (parentResolve, parentReject) => dispatch => {
  dispatch(requestStudentsList())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/students2courses?embed=student&embed=course`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  }).then( parseJSON )
    .then(res => {
      parentResolve && parentResolve()
      dispatch(receiveStudentsList(res))
  }).catch(err => {
      parentReject && parentReject()
      throw new Error(err)
  })
}

export const requestScoresList = createAction('REQUEST SCORES LIST')
export const receiveScoresList = createAction('RECEIVE SCORES LIST')
export const fetchScoresList = (parentResolve, parentReject) => dispatch => {
  dispatch(requestScoresList())
  fetch(`${backend.protocol}://${backend.domain}:${backend.port}/scores?embed=student&embed=course`, {
    ...defaultFetchParams,
    method: 'GET',
    credentials: 'include',
  }).then( parseJSON )
    .then(res => {
      parentResolve && parentResolve()
      dispatch(receiveScoresList(res))
  }).catch(err => {
      parentReject && parentReject()
      throw new Error(err)
    })
}
