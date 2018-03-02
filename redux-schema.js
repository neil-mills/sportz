{
  users: {
    isAuthed,
    isFetching
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar
      }
    }
  },
  articles: {
    isFetching,
    error,
    [articleId]: {
      author,
      title,
      description,
      urlToImage,
      publishedAt,
      sportId
    }
  },
  sports: {
    [sportId] : {
      title
    }
  }
  usersTeams: {
    lastUpdated,
    [uid]: {
      lastUpdated,
      teams: [team, team, team]
    }
  },
