import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import slug from 'slug'
import PropTypes from 'prop-types'
import { logout } from 'helpers/auth'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    const link = e.currentTarget.getAttribute('href')
    this.props.history.push(link)
  }

  render() {
    return (
      <footer className="footer">
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <a href="/" className="footer-nav-link" onClick={this.handleClick}>
                <span className="footer-nav-link__text">Home</span>
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="/sports" className="footer-nav-link" onClick={this.handleClick}>
                <span className="footer-nav-link__text">Sports</span>
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="/my-sports" className="footer-nav-link" onClick={this.handleClick}>
                <span className="footer-nav-link__text">
                {
                  this.props.isAuthed
                  ? 'My Sports' : 'Login'
                }
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    )
  }
}

Footer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

export default withRouter(Footer)