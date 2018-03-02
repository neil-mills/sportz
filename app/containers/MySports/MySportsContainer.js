import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as articlesActionCreators from 'redux/modules/articles'
import * as usersActionCreators from 'redux/modules/users'
import * as userTeamsActionCreators from 'redux/modules/userTeams'
import { Feed } from 'components'
import { Link } from 'react-router-dom'

const actionCreators = { ...articlesActionCreators, ...usersActionCreators, ...userTeamsActionCreators }

class MySportsContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(this.props.userTeams.length) {
      this.props.fetchAndFormatTeamArticles()
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.userTeams.length > 0 && this.props.userTeams.length == 0) {
      this.props.fetchAndFormatTeamArticles()
    }
  }
  
  render() {
    return (
    <div>
      <h1>My Sports</h1>
      { this.props.isAuthed === false &&
      <div>
        <p>Please login to personalise your my sports page</p>
        <Link className="button" to="/account">Login</Link>
      </div>
      }
      { this.props.isFetchingUserTeams === true && this.props.isFetchingFeed === true &&
        <p>Fetching</p>
      }
      { this.props.isAuthed === true && this.props.userTeams.length > 0 &&
 
        <Feed
          showLoader={false}
          isFetching={this.props.isFetchingFeed}
          feed={this.props.feed}  
          error={this.props.error}
        />
        
      }
      { this.props.isAuthed === true && !this.props.userTeams.length && this.props.fetchingUserTeams === false  &&
        <div>
          <p>Please personalise your news feed</p>
          <Link className="button" to="/account">Personalise News</Link>
        </div>
      }  
    </div>
    )
  }
}

MySportsContainer.propTypes = {
  isFetchingFeed: PropTypes.bool.isRequired,
  isFetchingUserTeams: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  fetchAndFormatTeamArticles: PropTypes.func.isRequired,
  userTeams: PropTypes.array.isRequired
}

const mapStateToProps = ({users, articles, userTeams}) => { //destructure the users and userTeams modules from state
  return {
    isFetchingFeed: articles.isFetching,
    isFetchingUserTeams: userTeams.isFetching,
    error: articles.error,
    isAuthed: users.isAuthed,
    userTeams: userTeams.teams,
    feed: articles.feed
  }
}

export default connect (
  mapStateToProps,
  (dispatch) => bindActionCreators(articlesActionCreators, dispatch)
)(MySportsContainer)