/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 17:34
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { getOrderList } from '../services/userdashboard'
import cookie from '../utils/cookie'
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
        if ( location.pathname === '/dashboard'
          || location.pathname === '/finishorder'
          || location.pathname === '/unfinishorder'
        ) {
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
    *switchroute({ payload }, { put }) {
      const pathid = payload.keyPath[0],itemid=payload.key;
      cookie.setCookie('pathid',pathid,0);
      cookie.setCookie('itemid',itemid,0);
      switch(itemid) {
        case '11': yield put(routerRedux.push('/mylist'));break;
        case '12': yield put(routerRedux.push('/alllist'));break;
        case '21': yield put(routerRedux.push('/dashboard'));break;
        case '22': yield put(routerRedux.push('/finishorder'));break;
        case '23': yield put(routerRedux.push('/unfinishorder'));break;
      }
    },
    *showorder( { payload: id },{ select }) {
      const orderItem = (yield select(state=>state.userdashboard.dataSource)).filter(item => item.id === id) // 取出对应id的订单
      return orderItem;
    },
    *create(){},
    // 因为delete是关键字
    *'delete'(){},
    *update(){},
  },
  reducers: {
    showLoading(){}, // 控制加载状态的 reducer
    showData(){
      // console.log(this.state.dataSource)
    }, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
