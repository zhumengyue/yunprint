/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 10:06
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { register } from '../services/register'

export default {
  // ...
  namespace: 'register',
  state: {
    loginLoading: false
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    // 路由跳转
    *register ({ payload }, { put, call }) {
      const { data } = yield call(register, payload)
      console.log(data)
      if (data.errcode === "0") {
        yield put(routerRedux.push('/'));
      } else {
        message.error("注册失败")
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
