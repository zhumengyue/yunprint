import React from 'react'
import dynamic from 'dva/dynamic'
import { Route, Switch, routerRedux } from 'dva/router'
import Login from './routes/Login'
import Products from './routes/Products'
import Register from './routes/Register/Register'
import UserDashboard from './routes/UserDashboard/UserDashboard'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/products" exact component={Products} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" exact component={UserDashboard} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
