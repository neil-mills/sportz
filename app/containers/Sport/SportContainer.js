import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as articlesActionCreators from 'redux/modules/articles'

class SportContainer extends Component {
  componentDidMount() {
    const sport = this.props.match.params.sportId
    this.props.fetchAndFormatArticles(sport)
    //console.log(this.context.store.getState())
  }
  render() {
    const sport = this.props.match.params.sportId
    return (
      <div>
        <h1>{sport}</h1>
        <Feed
        isFetching={this.props.isFetching}
        feed={this.props.feed}  
        error={this.props.error}
      />
      </div>
      
    )
  }
}

SportContainer.contextTypes = {
  store: PropTypes.object.isRequired
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
