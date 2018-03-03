import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import slug from 'slug'

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
            width={220}
          />
        </div>
        <h3 className="article__title">{article.title}</h3>
        <p className="article-meta">
          <span className="article-meta__posted"></span>
          <span className="article-meta__category">{article.category}</span>
        </p>
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