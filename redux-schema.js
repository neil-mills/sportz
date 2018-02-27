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
  usersSports: {
    lastUpdated,
    [uid]: {
      sportIds: [sportId, sportId, sportId]
    }
  },
