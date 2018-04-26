/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:06
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { userlogin } from '../services/userlogin'
import { shopperlogin } from '../services/shopperlogin'

const delay  = timeout => new Promise(resolve => setTimeout(resolve, timeout)); // 延迟函数

export default {
  // ...
  namespace: 'login',
  state: {
    loginLoading: false,
    isLogin: false,
    username: "",
    shoppername: "",
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
    // 路由跳转
    *login ({ payload }, { put, call, select }) {
      if(payload.shopper) {
        const {data} = yield call(shopperlogin, payload)
        if (data.errcode === "0") {
          message.success("登陆成功", 0.5);
          yield put({
            type: 'setShoppername',
            payload: {
              username: data.data.username,
              isLogin: true
            }
          });
          yield call(delay, 800);
          yield put(routerRedux.push('/shopdashboard'));
        } else {
          message.error("用户名密码错误")
        }
      }  else{
        const { data } = yield call(userlogin, payload)
        if (data.errcode === "0") {
          message.success("登陆成功",0.5);
          yield put({
            type: 'setUsername',
            payload: {
              username: data.data.username,
              isLogin: true
            }
          });
          yield call(delay,800);
          yield put(routerRedux.push('/dashboard'));
        } else {
          message.error("用户名密码错误")
        }
        // const username = yield select(state=>state.login.username) // 取state中的值
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
    },
    okLogin (state ){
      return {
        isLogin: true
      }
    },
    setUsername(state, action) {
      return {...state, ...action.payload};
    },
    setShoppername(state, action) {
      return {...state, ...action.payload};
    }
  }

  // ...
}
