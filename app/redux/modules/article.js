import { fetchArticles, fetchArticle, formatArticles } from 'helpers/api'

const FETCHING_ARTICLE = 'FETCHING_ARTICLE'
const FETCHING_ARTICLE_FAILURE = 'FETCHING_ARTICLE_FAILURE'
const FETCHING_ARTICLE_SUCCESS = 'FETCHING_ARTICLE_SUCCESS'

function fetchingArticle() {
  return {
    type: FETCHING_ARTICLE
  }
}

function fetchingArticleFailure(error) {
  return {
    type: FETCHING_ARTICLE_FAILURE,
    error
  }
}

function fetchingArticleSuccess(article) {
  return {
    type: FETCHING_ARTICLE_SUCCESS,
    article
  }
}

export function fetchAndHandleArticle(slug='',sport='football'){
  return function(dispatch) {
    dispatch(fetchingArticle())
    fetchArticles(sport)
    .then((data) => {
      const article = fetchArticle(data, slug)
      dispatch(fetchingArticleSuccess(article))
    })
  }
}

const initialState = {
  isFetching: true,
  error: '',
  info: {}
}

export default function article(state = initialState, action) {
  switch(action.type) {
    case FETCHING_ARTICLE:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_ARTICLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_ARTICLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        info: action.article
      }
    default: 
      return state
  }
}