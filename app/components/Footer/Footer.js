import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import slug from 'slug'
import PropTypes from 'prop-types'
import { logout } from 'helpers/auth'
import './style.scss'

class Footer extends Component {
  
  render() {
    return (
      <footer className="footer">
        <div className="footer__inner container">
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link to="/" className="footer-nav-link">
                  <span className="footer-nav-link__text">Home</span>
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/sports" className="footer-nav-link">
                  <span className="footer-nav-link__text">Sports</span>
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/my-sports" className="footer-nav-link" >
                  <span className="footer-nav-link__text">My Sports</span>
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/account" className="footer-nav-link">
                  <span className="footer-nav-link__text">
                    { this.props.isAuthed ? 'Account' : 'Login' }
                  </span>
                </Link>
              </li>
              { this.props.isAuthed &&
                <li className="footer-nav-item">
                  <a className="footer-nav-link" onClick={this.props.logout}>
                    <span className="footer-nav-link__text">Logout</span>
                  </a>
                </li>
              }
            </ul>
          </nav>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

export default withRouter(Footer)