import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Footer } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { firebaseAuth } from 'config/firebase'
import { formatUserInfo } from 'helpers/utils'

class MainContainer extends Component {
  componentDidMount() {
    //check if user logged in here...
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) { //if user is logged in, change auth status in state
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid) //dispatch the action creator
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
      } else {
        this.props.removeFetchingUser() // just end the fetching user state
      }
    })
  }

  render() {
    
    return (
      <div className="container">
        <Header />
        <div className="inner-container">
        {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
 // removeFetchingUser: PropTypes.func.isRequired
}

export default connect(
  ({users}) => ({ isAuthed: users.isAuthed, isFetching: users.isFetching }), //users module
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer)