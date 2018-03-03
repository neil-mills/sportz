import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { MainContainer, HomeContainer, SportContainer, ArticleContainer, SportsContainer, MySportsContainer, AccountContainer } from 'containers'
import { Header, Footer } from 'components'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import 'components/App/style.scss'

//need to use thunk middleware if using an action creator which returns a function rather than just an object
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const Root = () => (
    <Provider store={store}>
        <Router>
            <MainContainer>
                <Switch>
                    <Route exact path="/" component={HomeContainer} />
                    <Route path="/sport/:sportId" component={SportContainer} />
                    <Route exact path="/article/:sportId/:articleId" component={ArticleContainer} />
                    <Route exact path="/article/:sportId/:teamId/:articleId" component={ArticleContainer} />
                    <Route path="/sports" component={SportsContainer} />
                    <Route path="/my-sports" component={MySportsContainer} />
                    <Route path="/account" component={AccountContainer} />
                </Switch>
            </MainContainer>
        </Router>
    </Provider>
)

render(
  <Root />,
  document.getElementById('app')
)
