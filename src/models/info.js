/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/5/3
 * Time : 14:55
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { getShopInfo, getUserInfo, updateShopInfo, updateUserInfo } from '../services/info'
const delay  = timeout => new Promise(resolve => setTimeout(resolve, timeout)); // 延迟函数
export default {
  namespace: 'info',
  state: {
    userinfo: [],// 用户信息
    shopinfo: [],// 商户信息
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if ( location.pathname === '/edituserinfo')
          dispatch({type: 'getuserinfo'});
        else if ( location.pathname === '/editshopinfo')
          dispatch({type: 'getshopinfo'});
      });
    },
  },
  effects: {
    *getuserinfo({ payload }, { call, put }){
      const { data } = yield call(getUserInfo)
      if(data.errcode === "0") {
        yield put({
          type: 'querySuccess',
          payload: {
            userinfo: data.data,
          }
        });
      }
    },
    *updateuserinfo({ payload }, { call, put }){
      const { data } = yield call(updateUserInfo,payload)
      if (data.errcode === "0") {
        message.success("修改成功!", 1.1);
        yield call(delay,1200);
        window.history.go(-1);
      } else {
        message.error("修改失败")
      }
    },
    *getshopinfo({ payload }, { call, put }){
      const { data } = yield call(getShopInfo)
      if(data.errcode === "0") {
        yield put({
          type: 'querySuccess',
          payload: {
            shopinfo: data.data,
          }
        });
      }
    },
    *updateshopinfo({ payload }, { call, put }){
      const { data } = yield call(updateShopInfo,payload)
      if (data.errcode === "0") {
        message.success("修改成功!", 1.1);
        yield call(delay,1200);
        window.history.go(-1);
      } else {
        message.error("修改失败")
      }
    },
    *update(){},
  },
  reducers: {
    showLoading(){}, // 控制加载状态的 reducer
    showData(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
