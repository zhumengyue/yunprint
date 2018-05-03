import dva from 'dva';
import './index.css';
import { message } from 'antd';
import browserHistory from 'history/createBrowserHistory';
import hashHistory from 'history/createHashHistory';
const appHistory = browserHistory({
  basename: '/web/'        // 根目录名
});
// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message)
  },
  // history: browserHistory(),
  history: hashHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/register').default);
app.model(require('./models/userdashboard').default);
app.model(require('./models/shopdashboard').default);
app.model(require('./models/orderlist').default);
app.model(require('./models/info').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
