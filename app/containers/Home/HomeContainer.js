import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as articlesActionCreators from 'redux/modules/articles'
import { Feed } from 'components'

class HomeContainer extends Component {
  
  componentDidMount() {
    this.props.fetchAndFormatArticles() //call the thunk action creator to get and format the article feed
  }

  render() {
    return (
      <Feed
        feed={this.props.feed}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    )
  }

}

HomeContainer.propTypes =  {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  feed: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number.isRequired
}

function mapStateToProps( { articles } ) {
  const { isFetching, error, feed, lastUpdated } = articles
  return {
    isFetching,
    error,
    feed,
    lastUpdated
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(articlesActionCreators, dispatch)
)(HomeContainer)
