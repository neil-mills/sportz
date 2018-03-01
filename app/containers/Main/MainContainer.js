import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, Footer } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { firebaseAuth } from 'config/firebase'
import { formatUserInfo } from 'helpers/utils'
import { withRouter } from 'react-router-dom'

class MainContainer extends Component {

  componentDidMount() {
    //check if user logged in here...
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) { 
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid) 
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
      } else {
        this.props.removeFetchingUser() 
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
        <Footer isAuthed={this.props.isAuthed} />
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

export default withRouter(connect(
  ({users}) => ({ isAuthed: users.isAuthed, isFetching: users.isFetching }), //users module
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer))