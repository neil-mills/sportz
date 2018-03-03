import React from 'react'
import PropTypes from 'prop-types'
import { ArticleItem } from 'components'
import { withRouter } from 'react-router-dom'
import './style.scss'

const Feed = (props) => {
  return (
    props.isFetching === true && props.showLoader === true
    ? <p>{'Fetching'}</p>
    : <div className="feed">
      
      {
        props.feed.map((article, index) => (
          <ArticleItem
            key={index}
            article={article}
            hero={index === 0 ? true : false}
          />
        ))
      }
      </div>
  )
}

Feed.defaultProps = {
  showLoader: true
}

Feed.defaultProps = {
  isTeam: false
}

Feed.propTypes = {
  feed: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  showLoader: PropTypes.bool,
  isTeam: PropTypes.bool.isRequired
}

export default Feed