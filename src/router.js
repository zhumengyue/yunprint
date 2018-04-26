import React from 'react'
import { Route, Switch, routerRedux } from 'dva/router'
import Login from './routes/Login/Login'
import Products from './routes/Products'
import Register from './routes/Register/Register'
import UserDashboard from './routes/Dashboard/UserDashboard'
import ShopDashBoard from './routes/Dashboard/ShopDashBoard'
import FinishOrder from './routes/FinishOrder'
import ShopUnAcceptOrder from './routes/ShopUnAcceptOrder'
import UnFinishOrder from './routes/UnFinishOrder'
import ShopUnFinishOrder from './routes/ShopUnFinishOrder'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/products" exact component={Products} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" exact component={UserDashboard} />
        <Route path="/shopdashboard" exact component={ShopDashBoard} />
        <Route path="/finishorder" exact component={FinishOrder} />
        <Route path="/shopunacceptorder" exact component={ShopUnAcceptOrder} />
        <Route path="/unfinishorder" exact component={UnFinishOrder} />
        <Route path="/shopunfinishorder" exact component={ShopUnFinishOrder} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
