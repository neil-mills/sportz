import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as articleActionCreators from 'redux/modules/article'

class ArticleContainer extends Component {
  constructor(props) {
    super(props)
    this.handleBackClick = this.handleBackClick.bind(this)
  }

  componentDidMount() {
    const {articleId, sportId, teamId} = this.props.match.params
    if(this.props.match.params.teamId === undefined) {
      this.props.fetchAndHandleArticle(articleId, sportId)
    }
    if(this.props.userTeams.length && this.props.match.params.teamId !== undefined) {
      this.props.fetchAndHandleArticle(articleId, sportId, teamId)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {articleId, sportId, teamId} = this.props.match.params
    if(teamId !== undefined) {
      if(nextProps.userTeams.length > 0 && this.props.userTeams.length == 0) {
        this.props.fetchAndHandleArticle(articleId, sportId, teamId)
      }
    }
  }

  handleBackClick(e) {
    e.preventDefault()
    this.props.history.push(`/sport/${this.props.match.params.sportId}`)
  }

  render() {
   const { title, shortdesc, imgsrc } = this.props.info
    return this.props.isFetchingArticle
    ? <p>Fetching</p>
    : 
    <div>
      <article className="article" data-hero="true">
         <h1 className="article__title">{title}</h1>
        <div className="article-tn">
          <img src={imgsrc} alt={title} className="article-tn__img" />
        </div>
        <p>{shortdesc}</p>
      </article>
    </div>
  }
}

ArticleContainer.propTypes = {
  isFetchingArticle: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  info: PropTypes.object,
  userTeams: PropTypes.array.isRequired,
  isFetchingUserTeams: PropTypes.bool.isRequired,
  fetchAndHandleArticle: PropTypes.func.isRequired
}

function mapStateToProps( { article, userTeams } ) {
  const { isFetching, error, info } = article
  return {
    isFetchingArticle: isFetching,
    error,
    info,
    userTeams: userTeams.teams,
    isFetchingUserTeams: userTeams.isFetching
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(articleActionCreators, dispatch)
)(ArticleContainer)
