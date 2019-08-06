import * as types from './actionTypes'

const initialState = {
  autoLoaded: false,
  loading: false,
  user: null,
}

interface actionType {
    type: string
}

const session = (state = initialState, action: actionType | any) => {
  switch(action.type) {
    case types.SESSION_AUTOLOGIN:
      return { ...state, autoLoaded: true }
    default:
      return state
  }
}

export default session
