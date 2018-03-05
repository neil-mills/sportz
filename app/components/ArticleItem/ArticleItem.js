import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import slug from 'slug'
import './style.scss'
import { formatTitle } from 'helpers/utils'

class ArticleItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, team) {
    e.stopPropagation()
    e.preventDefault()
    const teamSlug = team !== null ? `/${slug(team).toLowerCase()}` : ''
    this.props.history.push(`/article/${slug(this.props.article.category).toLowerCase()}${teamSlug}/${slug(this.props.article.title).toLowerCase()}`)
  }

  render() {
    const {article} = this.props
    return (
      <article
        className="article"
        data-hero={this.props.hero}
        onClick={(e) => this.handleClick(e, article.team)}  
      >
        <div className="article-tn">
          <img
            src={article.imgsrc}
            alt={article.title}
            className="article-tn__img"
          />
        </div>
        <div className="article__body">
          <div className="article__content">
            <h3 className="article__title">{article.title}</h3>
            <p className="article-meta">{article.team !== null ? article.team : formatTitle(article.category)}</p>
          </div>
        </div>
      </article>
    )
  }
}

ArticleItem.contextTypes = {
  router: PropTypes.object.isRequired,
}

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired
}

export default withRouter(ArticleItem)