import React, { Component } from 'react'
import Feed from 'components'
import { connect } from 'react-redux'

export default class SportContainer extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <Feed />
    )
  }
}

/*
export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(articlesActionCreators, dispatch)
)(SportContainer)
*/