import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as articleActionCreators from 'redux/modules/article'

class ArticleContainer extends Component {
  constructor(props) {
    super(props)
    this.handleBackClick = this.handleBackClick.bind(this)
  }
  componentDidMount() {
    const {articleId, sportId} = this.props.match.params
      this.props.fetchAndHandleArticle(articleId, sportId)
  }
  handleBackClick(e) {
    e.preventDefault()
    this.props.history.push(`/sport/${this.props.match.params.sportId}`)
  }
  render() {
   const { title, shortdesc, imgsrc } = this.props.info
    return this.props.isFetching
    ? <p>Fetching</p>
    : <article>
      <a className="back-link" onClick={this.handleBackClick}>Back</a>
      <h1 className="article-title">{title}</h1>
      <div className="article-image">
        <img src={imgsrc} alt={title} />
      </div>
      <p>{shortdesc}</p>
      </article>
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
