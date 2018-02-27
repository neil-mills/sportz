// Users

{
  type: AUTH_USER,
  uid
}

{
  type: UNAUTH_USER,
}

{
  type: FETCHING_USER
}

{
  type: FETCHING_USER_FAILURE,
  error
}

{
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp
}

// Articles

{
  type: FETCHING_ARTICLES
}

{
  type: FETCHING_ARTICLES_FAILURE,
  error
}

{
  type: FETCHING_ARTICLES_SUCCESS,
    articles
}



// Users Sports

{
  type: FETCHING_USER_SPORTS
}

{
  type: FETCHING_USER_SPORTS_FAILURE
  error
}

{
  type: FETCHING_USER_SPORTS_SUCCESS
    sports
}
