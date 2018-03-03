import React from 'react'
import PropTypes from 'prop-types'

const HeroArticle = (props) => {
  return (
   <div className="hero-article">
    <div className="hero-article-image">
        <img src={props.article.imgsrc} alt={props.article.title} />
    </div>
     <h3 className="hero-article__title">{props.article.title}</h3>
   </div>

  )
}

HeroArticle.propTypes = {
  article: PropTypes.object
}

export default HeroArticle