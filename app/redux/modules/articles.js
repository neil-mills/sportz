import { fetchAllSportsArticles, fetchArticles, formatArticles, fetchAllUserTeamArticles } from 'helpers/api'

const FETCHING_ARTICLES = 'FETCHING_ARTICLES'
const FETCHING_ARTICLES_FAILURE = 'FETCHING_ARTICLES_FAILURE'
const FETCHING_ARTICLES_SUCCESS = 'FETCHING_ARTICLES_SUCCESS'

function fetchingArticles() {
  return {
    type: FETCHING_ARTICLES
  }
}

function fetchingArticlesFailure(error) {
  return {
    type: FETCHING_ARTICLES_FAILURE,
    error
  }
}

function fetchingArticlesSuccess(feed, lastUpdated) {
  return {
    type: FETCHING_ARTICLES_SUCCESS,
    feed,
    lastUpdated
  }
}

//middleware thunk action creator

export function fetchAndFormatArticles(sport='football') {
  return function (dispatch) {
    dispatch(fetchingArticles()) 
    fetchArticles(sport)
    .then((articles) => {
      const feed = formatArticles(articles)
      dispatch(fetchingArticlesSuccess(feed, Date.now()))
    })
    .catch((error) => dispatch(fetchingArticlesFailure(error)))
  }
}

export function fetchAndFormatTeamArticles() {
    return function (dispatch, getState) {
      const userTeams = getState().userTeams.teams
      dispatch(fetchingArticles())
      fetchAllUserTeamArticles(userTeams)
      .then((articles) => {
       const feed = formatArticles(articles)
        dispatch(fetchingArticlesSuccess(feed, Date.now()))
      })
      .catch((error) => dispatch(fetchingArticlesFailure(error)))
    }
}

const initialState = {
  isFetching: true,
  error: '',
  lastUpdated: 0,
  feed: []
}

export default function articles(state = initialState, action) {
  switch(action.type) {
    case FETCHING_ARTICLES:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_ARTICLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_ARTICLES_SUCCESS:
      //articles need to be formatted with associated category
      const { lastUpdated, feed } = action
      return {
        ...state,
        isFetching: false,
        error: '',
        lastUpdated,
        feed
      }
    default:
      return state
  }
}