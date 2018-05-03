import React from 'react'
import { Route, Switch, routerRedux } from 'dva/router'
import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import UserDashboard from './routes/Dashboard/UserDashboard'
import ShopDashBoard from './routes/Dashboard/ShopDashBoard'
import FinishOrder from './routes/FinishOrder'
import ShopUnAcceptOrder from './routes/ShopUnAcceptOrder'
import UnFinishOrder from './routes/UnFinishOrder'
import ShopUnFinishOrder from './routes/ShopUnFinishOrder'
import ShopFinishOrder from './routes/ShopFinishOrder'
import EditUserInfo from './routes/Edit/EditUserInfo'
import EditShopInfo from './routes/Edit/EditShopInfo'
import Test from './routes/Test'
import MyList from './routes/MyList'
import AllList from './routes/AllList'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/test" exact component={Test} />
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
        <Route path="/edituserinfo" exact component={EditUserInfo} />
        <Route path="/editshopinfo" exact component={EditShopInfo} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
