import React from 'react'
import PropTypes from 'prop-types'

const FacebookLogin = (props) => {
  return (
    <div className="login">
      <button
        className="login__button"
        onClick={this.props.handleAuth}
      >
        Login with Facebook
      </button>
    </div>
  )
}

FacebookLogin.propTypes = {
  handleAuth: PropTypes.func.isRequired
}

export default FacebookLogin