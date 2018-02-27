import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class ArticleContainer extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <div>Article</div>
    )
  }
}

/*
export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(articlesActionCreators, dispatch)
)(SportContainer)
*/