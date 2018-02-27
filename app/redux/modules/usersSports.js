const FETCHING_USERS_SPORTS = 'FETCHING_USERS_SPORTS'
const FETCHING_USERS_SPORTS_FAILURE = 'FETCHING_USERS_SPORTS_FAILURE'
const FETCHING_USERS_SPORTS_SUCCESS = 'FETCHING_USERS_SPORTS_SUCCESS'

export function fetchingUsersSports() {
  return {
    type: FETCHING_USERS_SPORTS
  }
}

export function fetchingUsersSportsFailure(error) {
  return {
    type: FETCHING_USERS_SPORTS_FAILURE,
    error
  }
}

export function fetchingUsersSportsSuccess(sports) {
  return {
    type: FETCHING_USERS_SPORTS_SUCCESS,
    uid,
    sportsIds
  }
}

const intitalState = {
  isFetching: true,
  error: ''
}

export function(state = inititalState, action) {
  switch(action.type) {
    case FETCHING_USERS_SPORTS:
      return {
        isFetching: true
      }
    case FETCHING_USERS_SPORTS_FAILURE:
      return {
        isFetching: false,
        error: action.error
      }
    case FETCHING_USERS_SPORTS_SUCCESS:
      return {
        isFetching: false,
        error: '',
        [action.uid]: action.sportsIds
      }
  }
}