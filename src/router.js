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
import ShopFinishOrder from './routes/ShopFinishOrder'
import MyList from './routes/MyList'
import AllList from './routes/AllList'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history} basename='/web/dist'>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/products" exact component={Products} />
        <Route path="/mylist" exact component={MyList} />
        <Route path="/alllist" exact component={AllList} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" exact component={UserDashboard} />
        <Route path="/shopdashboard" exact component={ShopDashBoard} />
        <Route path="/finishorder" exact component={FinishOrder} />
        <Route path="/shopunacceptorder" exact component={ShopUnAcceptOrder} />
        <Route path="/unfinishorder" exact component={UnFinishOrder} />
        <Route path="/shopunfinishorder" exact component={ShopUnFinishOrder} />
        <Route path="/shopfinishorder" exact component={ShopFinishOrder} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
