import React from 'react'
import { withRouter } from 'react-router-dom'

function SportsList(props) {
  function handleClick(e, slug) {
    e.preventDefault()
    props.history.push(`/sport/${slug}`)
  }
  return (
    <menu className="sports-menu">
      <ul className="sports-list">
        { props.sports.map((sport, index) => (
          <li className="sports-list-item" key={index}>
            <a
            className="sports-list-item__link"
            title={sport.title}
            onClick={(e) => handleClick(e, sport.slug)}
            >
              {sport.title}
            </a>
          </li>
          ))
        }
      </ul>
    </menu>
  )
}

export default withRouter(SportsList)
