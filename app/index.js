import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { HomeContainer, SportContainer, ArticleContainer } from 'containers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

//need to use thunk middleware if using an action creator which returns a function rather than just an object
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const Root = () => (
    <Provider store={store}>
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={HomeContainer} />
                    <Route path="/sport/:sportId" component={SportContainer} />
                    <Route path="/article/:sportId/:articleId" component={ArticleContainer} />
                </Switch>
            </div>
        </Router>
    </Provider>
)

render(
  <Root />,
  document.getElementById('app')
)
