import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import reducers from './reducer'
import config from './config'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import './index.less'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute />
				<Switch>
					<Route path='/bossinfo' component={BossInfo} />
					<Route path='/geniusinfo' component={GeniusInfo} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/chat/:user' component={Chat} />
					<Route component={Dashboard} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
