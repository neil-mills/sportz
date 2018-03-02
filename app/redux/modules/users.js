import { formatUserInfo } from 'helpers/utils'
import auth, { logout } from 'helpers/auth'
import { saveUser, getUserTeams } from 'helpers/api'
import userTeams, { addAllUserTeams } from './userTeams'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

export function authUser(uid) {
  return {
    type: AUTH_USER,
    uid
  }
}

export function unauthUser() {
  return {
    type: UNAUTH_USER
  }
}

export function fetchingUser() {
  return {
    type: FETCHING_USER
  }
}

export function fetchingUserFailure(error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user'
  }
}

export function fetchingUserSuccess(uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
  }
}

export function removeFetchingUser() {
  return {
    type: REMOVE_FETCHING_USER
  }
}

export function fetchAndHandleAuthedUser() {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth().then(({user, credentials}) => {
      const userData = user.providerData[0]
      console.log('userdata',userData)
      const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
      
      saveUser(userInfo)
      return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
     // dispatch(authUser(user.uid))
     
    })
    
    .then(({user}) => getUserTeams(user.uid).then((teams) => dispatch(addAllUserTeams(user.uid, teams))))
    .then((user) => dispatch(authUser(user.uid)))
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function logoutAndUnauth () {
  return function(dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

//reducer

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: ''
}

export default function users(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
      ? {
        ...state,
        isFetching: false,
        error: ''
      }
      : {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action)
      }
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}