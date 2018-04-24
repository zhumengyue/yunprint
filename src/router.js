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

// function RouterConfig({ history, app }) {
//   let routes = [
//     {
//       path: '/login',
//       models: () => [import('./models/login')],
//       component: () => import('./routes/Login'),
//     },
//     {
//       path: '/products',
//       models: () => [import('./models/products')],
//       component: () => import('./routes/Products'),
//     },
//     {
//       path: '/register',
//       models: () => [import('./models/register')],
//       component: () => import('./routes/Register/Register'),
//     },
//     {
//       path: '/dashboard',
//       models: "",
//       component: () => import('./routes/UserDashboard/UserDashboard'),
//     }
//   ];
//
//   // 将数据源转换为 <Router > 标签的形式........
//   return (
//     <ConnectedRouter history={history}>
//       {/*<Page>*/}
//         <Switch>
//           <Route path="/" exact render={() => (<Redirect to="/login" />)} />
//           {
//             routes.map(({ path, ...dynamics }, key) => (
//               <Route
//                 exact
//                 key={key}
//                 path={path}
//                 component={dynamic({ app, ...dynamics })}
//               />
//             ))
//           }
//         </Switch>
//       {/*</Page>*/}
//     </ConnectedRouter>
//   );
// }

export default RouterConfig;
