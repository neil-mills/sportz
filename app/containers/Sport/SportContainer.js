import React, { Component } from 'react'
import { Feed } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as articlesActionCreators from 'redux/modules/articles'

class SportContainer extends Component {
  componentDidMount() {
    const sport = this.props.match.params.sportId
    this.props.fetchAndFormatArticles(sport)
  }
  render() {
    return (
      <Feed
        isFetching={this.props.isFetching}
        feed={this.props.feed}  
        error={this.props.error}
      />
    )
  }
}

function mapStateToProps({articles}) {
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
)(SportContainer)
