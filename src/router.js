import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import Login from './routes/Login';
import Products from './routes/Products';

const { ConnectedRouter } = routerRedux;
function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/products" exact component={Products} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
