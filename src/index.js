import dva from 'dva';
import './index.css';
import { message } from 'antd';
import browserHistory from 'history/createBrowserHistory';
import hashHistory from 'history/createHashHistory';
// 1. Initialize
const app = dva({
  initialState: {
    products: [
      { name: 'dva', id: 1, key: 1 },
      { name: 'antd', id: 2, key: 2 },
      { name: 'design', id: 3, key: 3 },
    ],
  },
  onError(e) {
    message.error(e.message)
  },
  history: hashHistory(),
  basename: '/web/dist'
  // history: hashHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/register').default);
app.model(require('./models/products').default);
app.model(require('./models/userdashboard').default);
app.model(require('./models/shopdashboard').default);
app.model(require('./models/orderlist').default);
app.model(require('./models/info').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
