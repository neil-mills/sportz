import {updateUserTeams, getUserTeams } from 'helpers/api'

const FETCHING_USER_TEAMS = 'FETCHING_USER_TEAMS'
const FETCHING_USER_TEAMS_FAILURE = 'FETCHING_USER_TEAMS_FAILURE'
const FETCHING_USER_TEAMS_SUCCESS = 'FETCHING_USER_TEAMS_SUCCESS'
const ADD_USER_TEAM = 'ADD_USER_TEAM'
const REMOVE_USER_TEAM = 'REMOVE_USER_TEAM'
const ADD_ALL_USER_TEAMS = 'ADD_ALL_USER_TEAMS'

export function fetchingUserTeams() {
  return {
    type: FETCHING_USER_TEAMS
  }
}

export function fetchingUserTeamsFailure(error) {
  return {
    type: FETCHING_USER_TEAMS_FAILURE,
    error
  }
}

export function fetchingUserTeamsSuccess(teams) {
  return {
    type: FETCHING_USERS_SPORTS_SUCCESS,
    uid,
    teams
  }
}

export function addUserTeam(uid, team) {
  return {
    type: ADD_USER_TEAM,
    uid,
    team
  }
}

export function removeUserTeam(uid, teams) {
  return {
    type: REMOVE_USER_TEAM,
    uid,
    teams
  }
}

export function addAllUserTeams(teams) {
  console.log('add all user teams dispatched', teams)
  return {
    type: ADD_ALL_USER_TEAMS,
    teams
  }
}

//thunk middleware functions to add/remove user teams from state and firebase

export function saveUserTeamMiddleware (team) {
  return function (dispatch, getState) { //passed the dispatch and getState
    const uid = getState().users.authedId
    const teams = [...getState().userTeams.teams,team]
    updateUserTeams(uid, teams)
    .then(() => {
      dispatch(addUserTeam(uid, team))
    })
    .catch((err) => console.warn(err.message))  
  }
}

export function removeUserTeamMiddleware( teamToRemove ) {
  return function (dispatch, getState) { //passed the dispatch and getState
    const uid = getState().users.authedId
    const teams = getState().userTeams.teams.filter((team) => team !== teamToRemove)
    updateUserTeams(uid, teams)
    .then(() => {
      dispatch(removeUserTeam(uid, teams))
    })
    .catch((err) => console.warn(err.message))
  }
}

export function getUserTeamsMiddleware() {
  return function (dispatch, getState) { //passed the dispatch and getState
    const uid = getState().users.authedId
    getUserTeams(uid)
    .then((teams) => {
      dispatch(addAllUserTeams(teams))
    })
    .catch((err) => console.warn(err.message))
  }
}
/*

const initialUsersTeamState = {
  lastUpdated: 0,
  teams: []
}


export function usersTeam (state = initialUsersTeamState, action) {
  switch(action.type) {
    case ADD_USER_TEAM:
      return {
        ...state,
        lastUpdated: Date.now(),
        teams: [...state.teams,action.team]
      }
    case REMOVE_USER_TEAM:
      return {
        ...state,
        lastUpdated: Date.now(),
        teams: action.teams
      }
    case ADD_ALL_USER_TEAMS:
      return {
        ...state,
        lastUpdated: Date.now(),
        teams: action.teams === null ? [] : action.teams
      }
    default:
      return state
  }
}
*/

const intitialState = {
  isFetching: true,
  error: '',
  teams: []
}

export default function userTeams (state = intitialState, action) {
  switch(action.type) {
    case FETCHING_USER_TEAMS:
      return {
        isFetching: true
      }
    case FETCHING_USER_TEAMS_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }
    case FETCHING_USER_TEAMS_SUCCESS:
      return {
        isFetching: false,
        error: '',
        [action.uid]: action.sportsIds
      }
    case ADD_USER_TEAM:
      return {
        ...state,
        lastUpdated: Date.now(),
        teams: [...state.teams, action.team] //usersTeam(state[action.uid], action)
      }
    case REMOVE_USER_TEAM:
    console.log(action.teams)
      return {
        ...state,
        lastUpdated: Date.now(),
        teams: action.teams
      }
    case ADD_ALL_USER_TEAMS:
      return {
        ...state,
        teams: action.teams
        //[action.uid]: usersTeam(state[action.uid], action)
      }
    default:
      return state
  }
}