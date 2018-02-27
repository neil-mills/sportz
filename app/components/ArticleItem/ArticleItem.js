import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import slug from 'slug'

class ArticleItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    console.log(this.props.article.title)
    e.preventDefault()
    console.log('click')
   this.props.history.push(`/article/${slug(this.props.article.title).toLowerCase()}`)
  }

  render() {
    const {article} = this.props
    return (
      <article
        className="article"
        onClick={(e) => this.handleClick(e)}  
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