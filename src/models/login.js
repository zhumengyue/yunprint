/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:06
 * Desc :
 */
import { routerRedux } from 'dva/router';

export default {
  // ...
  namespace: 'login',
  state: {
    loginLoading: false
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    // 路由跳转
    *login ({ payload }, { put }) {
      yield put(routerRedux.push('/products'));
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        loginLoading: false,
      }
    }
  }

  // ...
}
