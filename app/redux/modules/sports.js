const FETCHING_SPORTS = 'FETCHING_SPORTS'
const FETCHING_SPORTS_SUCCESS = 'FETCHING_SPORTS_SUCCESS'
const FETCHING_SPORTS_FAILURE = 'FETCHING_SPORTS_FAILURE'

function fetchingSports(sport) {
  return {
    type: FETCHING_SPORTS
  }
}

function fetchingSportsSuccess(sports) {
  return {
    type: FETCHING_SPORTS,
    sports
  }
}

const initialState = {
  isFetching: true,
  error: '',
  sports: {}
}

export default sports(state = initialState, action) {
  switch(action.type) {
    case FETCHING_SPORTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_SPORTS_SUCCESS:
      return {
        ...state,
        sports: action.sports,
        isFetching: false,
        error: ''
      }
    case FETCHING_SPORTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

