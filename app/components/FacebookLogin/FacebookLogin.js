import React from 'react'
import PropTypes from 'prop-types'

const FacebookLogin = (props) => {
  return (
    <div className="login">
      <button
        className="button button--login"
        onClick={props.handleAuth}
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