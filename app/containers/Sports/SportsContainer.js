import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sports } from 'config/sports'
import { SportsList } from 'components'

export default class SportsContainer extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Sports</h1>
        <SportsList
        sports={sports}
        />
      </div>
      
    )
  }
}