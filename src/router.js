import React from 'react'
import { Route, Switch, routerRedux } from 'dva/router'
import Login from './routes/Login'
import Products from './routes/Products'
import Register from './routes/Register/Register'
import UserDashboard from './routes/UserDashboard/UserDashboard'
import FinishOrder from './routes/FinishOrder'
import UnFinishOrder from './routes/UnFinishOrder'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/products" exact component={Products} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" exact component={UserDashboard} />
        <Route path="/finishorder" exact component={FinishOrder} />
        <Route path="/unfinishorder" exact component={UnFinishOrder} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
