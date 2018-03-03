import React, {Component} from 'react'
import './style.scss'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__inner container">
          <div className="app-logo">Sportz</div>
        </div>
      </header>
    )
  }
}