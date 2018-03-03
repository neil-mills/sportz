import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import '../../svg/tick.svg'

export default class TeamList extends Component{
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.renderTeam = this.renderTeam.bind(this)
  }

  handleClick(e, active, team) {
    if(active) {
      this.props.removeUserTeam(team)
    } else {
      this.props.saveUserTeam(team)
    }  
  }

  renderTeam(key, team) {
    //if title is in userTeams then set to active
    const active = this.props.userTeams.includes(team.title) ? true : false
    return (
      <li className="team-item" key={key}>
        <a
          className="team-link"
          title={team.title}
          onClick={(e) => this.handleClick(e, active, team.title)}
          data-active={active}
        >
          <span className="team-link__label">{team.title}</span>
          <svg className="team-link__icon" viewBox="0 0 60 60">
            <use xlinkHref="#tick"></use>
          </svg>
        </a>
      </li>
    )
  }

  render() {
    return (
      <menu className="team-menu">
        <ul className="team-list">
          {
            this.props.teams.map((team, index) => this.renderTeam(index, team))
          }
        </ul>
      </menu>
    )
  }
}

TeamList.propTypes = {
  teams: PropTypes.array.isRequired,
  saveUserTeam: PropTypes.func.isRequired,
  removeUserTeam: PropTypes.func.isRequired
}
