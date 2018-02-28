import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sports } from 'config/sports'
import { SportsList } from 'components'

export default class SportsContainer extends Component {
  render() {
    return (
      <SportsList
        sports={sports}
      />
    )
  }
}