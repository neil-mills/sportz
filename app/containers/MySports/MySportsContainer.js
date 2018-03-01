import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import { FacebookLogin } from 'components'
import { checkIfAuthed } from 'helpers/auth'

class MySportsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleAuth = this.handleAuth.bind(this)
  }
  componentDidMount() {
    //check if user is logged in here
   // const isAuthed = checkIfAuthed(store)
  }

  handleAuth(e) {
    this.props.fetchAndHandleAuthedUser()
  }

  render() {
    return this.props.isAuthed
    ? <div>User selected teams here </div>
    : <FacebookLogin handleAuth={this.handleAuth} />
  }
}

MySportsContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
}

const mapStateToProps = ({users}) => { //destructure the users module from state
  return {
    isFetching: users.isFetching,
    error: users.error,
    isAuthed: users.isAuthed
  }
}

export default connect (
  mapStateToProps,
  (dispatch) => bindActionCreators(usersActionCreators, dispatch)
)(MySportsContainer)