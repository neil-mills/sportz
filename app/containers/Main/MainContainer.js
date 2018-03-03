import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Footer } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as userTeamsActionCreators from 'redux/modules/userTeams'
import { firebaseAuth } from 'config/firebase'
import { formatUserInfo } from 'helpers/utils'
import { withRouter } from 'react-router-dom'


const actionCreators = {...userActionCreators, ...userTeamsActionCreators}

class MainContainer extends Component {

  componentDidMount() {
    //check if user logged in here...
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) { 
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid) 
        this.props.getUserTeamsMiddleware()
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
      } else {
        this.props.removeFetchingUser() 
      }
    })
  }


  render() {
    
    return (
        <div>
          <Header />
          <main className="main" role="main">
            <div className="main__inner container">
              {this.props.children}
            </div>
          </main>
          <Footer isAuthed={this.props.isAuthed} logout={this.props.logoutAndUnauth} />
        </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
  authedId: PropTypes.string,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  logoutAndUnauth: PropTypes.func.isRequired
 // removeFetchingUser: PropTypes.func.isRequired
}

export default withRouter(connect(
  ({users}) => ({ isAuthed: users.isAuthed, authedId: users.authedId, isFetching: users.isFetching }), //users module
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(MainContainer))