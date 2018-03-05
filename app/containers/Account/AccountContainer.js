import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as userTeamsActionCreators from 'redux/modules/userTeams'
import { FacebookLogin, TeamList } from 'components'
import { checkIfAuthed } from 'helpers/auth'
import { teams as teamData }  from 'config/teams'

const actionCreators = {...usersActionCreators, ...userTeamsActionCreators}

class AccountContainer extends Component {
  constructor(props) {
    super(props)
    this.handleAuth = this.handleAuth.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

  }

  handleAuth(e) {
    this.props.fetchAndHandleAuthedUser()
  }

  render() {
    return this.props.isAuthed === true
    ? <div>
      <h1 className="page-title">Account</h1>
      <div className="content-block">
      <p className="no-tm">Select teams:</p>
      <TeamList
        teams={teamData}
        userTeams={this.props.teams}
        saveUserTeam={this.props.saveUserTeamMiddleware}
        removeUserTeam={this.props.removeUserTeamMiddleware}
      />
    </div>
    </div>
    : <div className="content-block">
        <div className="login">
          <h3>Login to personalise your My Sports news feed for the teams you support</h3>
          <FacebookLogin handleAuth={this.handleAuth} />
        </div>
    </div>
  }
}

AccountContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  saveUserTeamMiddleware: PropTypes.func.isRequired,
  removeUserTeamMiddleware: PropTypes.func.isRequired
}

const mapStateToProps = ({users, userTeams}) => { //destructure the users and userTeams modules from state
  return {
    isFetching: users.isFetching,
    error: users.error,
    isAuthed: users.isAuthed,
    teams: userTeams.teams
  }
}

export default connect (
  mapStateToProps,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AccountContainer)