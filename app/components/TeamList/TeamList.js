import React, {Component} from 'react'
import PropTypes from 'prop-types'
import slug from 'slug'
import './style.scss'
import '../../svg/tick.svg'
import '../../svg/arsenal.svg'
import '../../svg/bournemouth.svg'
import '../../svg/brighton-and-hove-albion.svg'
import '../../svg/burnley.svg'
import '../../svg/crystal-palace.svg'
import '../../svg/chelsea.svg'
import '../../svg/everton.svg'
import '../../svg/huddersfield-town.svg'
import '../../svg/leicester-city.svg'
import '../../svg/liverpool.svg'
import '../../svg/manchester-united.svg'
import '../../svg/manchester-city.svg'
import '../../svg/newcastle-united.svg'
import '../../svg/stoke-city.svg'
import '../../svg/southampton.svg'
import '../../svg/swansea-city.svg'
import '../../svg/tottenham-hotspur.svg'
import '../../svg/watford.svg'
import '../../svg/west-bromwich-albion.svg'
import '../../svg/west-ham-united.svg'

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
         <svg className="team-link__badge" viewBox="0 0 60 60">
            <use xlinkHref={`#${slug(team.title).toLowerCase()}`}></use>
          </svg>
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
