import React from 'react'
import PropTypes from 'prop-types'
import { ArticleItem } from 'components'

const Feed = (props) => {
  return (
    props.isFetching === true
    ? <p>{'Fetching'}</p>
    : <div>
      {
        props.feed.map((article, index) => (
          <ArticleItem
            key={index}
            article={article}
          />
        ))
      }
      </div>
  )
}

Feed.propTypes = {
  feed: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Feed