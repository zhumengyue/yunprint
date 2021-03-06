/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 10:06
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { userRegister, storeRegister } from '../services/register'

const delay  = timeout => new Promise(resolve => setTimeout(resolve, timeout)); // 延迟函数
export default {
  namespace: 'register',
  state: {
    loginLoading: false
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    *userRegister ({ payload }, { put, call }) { // 注册逻辑
      const { data } = yield call(userRegister, payload)
      if (data.errcode === "0") {
        message.success("注册成功!", 1.5);
        yield call(delay,1600);
        yield put(routerRedux.push('/'))
      } else {
        message.error("注册失败")
      }
    },
    *storeRegister ({ payload }, { put, call }) { // 注册逻辑
      const { data } = yield call(storeRegister, payload)
      if (data.errcode === "0") {
        message.success("注册成功!", 1.5);
        yield call(delay,1600);
        yield put(routerRedux.push('/'))
      } else {
        message.error("注册失败")
      }
    },
    *goregister({ payload },{put}) { // 前往注册页面
      yield put(routerRedux.push('/register'))
    },
    *returnback({ payload },{put}) { // 前往注册页面
      yield put(routerRedux.push('/'))
    }
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
}
