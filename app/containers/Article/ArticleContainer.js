import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as articleActionCreators from 'redux/modules/article'

class ArticleContainer extends Component {
  componentDidMount() {
    const {articleId, sportId} = this.props.match.params
      this.props.fetchAndHandleArticle(articleId, sportId)
  }
  render() {
    return (
      <div>Article Detail</div>
    )
  }
}

function mapStateToProps( { article } ) {
  const { isFetching, error, info } = article
  return {
    isFetching,
    error,
    info,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(articleActionCreators, dispatch)
)(ArticleContainer)
