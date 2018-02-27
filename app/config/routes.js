import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function getRoutes () {
  return (
    <Router>
    <div className="container">
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/sport/:sportId" component={SportContainer} />
        </Switch>
    </div>
    </Router>
  )
}