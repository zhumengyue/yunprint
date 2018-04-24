/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:06
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { login } from '../services/login'

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
    *login ({ payload }, { put, call }) {
      const { data } = yield call(login, payload)
      if (data.errcode === "0") {
        yield put(routerRedux.push('/products'));
      } else {
        message.error("用户名密码错误")
      }
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
