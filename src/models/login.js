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
import { userdellogin } from '../services/userdellogin'
import { shopperlogin } from '../services/shopperlogin'
import cookie from '../utils/cookie'

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
    *editinfo({ payload }, { put, call }) {
      if (cookie.getCookie('isUser') === '1') {
        yield put(routerRedux.push('/edituserinfo'));
      } else if(cookie.getCookie('isShop') === '1') {
        yield put(routerRedux.push('/editshopinfo'));
      }
    },
    *dellogin ({ payload }, { put, call }){
      // todo 注销登录
      yield call(userdellogin)
      message.success("注销成功", 0.6);
      yield call(delay, 800);
      yield put(routerRedux.push('/'));
    },
    *login ({ payload }, { put, call }) {
      // todo 登录
      if(payload.shopper) {
        const {data} = yield call(shopperlogin, payload)
        if (data.errcode === "0") {
          cookie.setCookie('username',data.data.username)
          cookie.setCookie('isShop',1)
          cookie.setCookie('isUser',0)
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
          cookie.setCookie('username',data.data.username)
          cookie.setCookie('isShop',0)
          cookie.setCookie('isUser',1)
          message.success("登陆成功",0.5);
          yield put({
            type: 'setUsername',
            payload: {
              username: data.data.username,
              isLogin: true
            }
          });
          yield call(delay,800);
          yield put(routerRedux.push('/mylist'),payload);
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
    setUsername(state, action) {
      return {...state, ...action.payload};
    },
    setShoppername(state, action) {
      return {...state, ...action.payload};
    }
  }

  // ...
}
