import { createReducer } from 'redux-act'

import {
  showMessage,
  hideMessage,
} from 'actions/message'


const initialState = {
  messageText: null,
}

export default createReducer({
  [showMessage]: (state, payload) => ({
    ...state,
    messageText: payload,
  }),
  [hideMessage]: state => ({
    ...state,
    messageText: null,
  }),
}, initialState)
