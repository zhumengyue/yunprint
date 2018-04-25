/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 17:34
 * Desc :
 */
import { routerRedux } from 'dva/router'
// import { message } from 'antd'
import { getOrderList } from '../services/userdashboard'

const delay  = timeout => new Promise(resolve => setTimeout(resolve, timeout)); // 延迟函数
export default {
  namespace: 'userdashboard',
  state: {
    dataSource: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dashboard') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { select, call, put }) {
      const { data } = yield call(getOrderList);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data.data,
          }
        });
      }
    },
    *goto({ payload}, {put}) {
      // yield put(routerRedux.push('./'))
    },
    *create(){},
    // 因为delete是关键字
    *'delete'(){},
    *update(){},
  },
  reducers: {
    showLoading(){}, // 控制加载状态的 reducer
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
