import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import lodash from 'lodash'
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
    let sport = this.props.match.params.sportId.replace('-',' ')
    sport = sport.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    return (
      <div>
        <h1 className="page-title">{sport}</h1>
        <Feed
        isFetching={this.props.isFetching}
        feed={this.props.feed}  
        error={this.props.error}
        showLoader={true}
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
