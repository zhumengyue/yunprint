/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 17:41
 * Desc :
 */
import { routerRedux } from 'dva/router'
import { getOrderList, updateOrder, shopCancelOrder } from '../services/shopdashboard'
import { message } from 'antd'
import cookie from '../utils/cookie'
const delay  = timeout => new Promise(resolve => setTimeout(resolve, timeout)); // 延迟函数
export default {
  namespace: 'shopdashboard',
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
        if ( location.pathname === '/shopdashboard'
          || location.pathname === '/shopunacceptorder'
          || location.pathname === '/shopunfinishorder'
          || location.pathname === '/shopfinishorder'
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
    *switchroute({ payload}, {put}) {
      const pathid = payload.keyPath[0],itemid=payload.key;
      cookie.setCookie('pathid',pathid,0);
      cookie.setCookie('itemid',itemid,0);
      switch(itemid) {
        case '21': yield put(routerRedux.push('/shopdashboard'));break;
        case '22': yield put(routerRedux.push('/shopunacceptorder'));break;
        case '23': yield put(routerRedux.push('/shopunfinishorder'));break;
        case '24': yield put(routerRedux.push('/shopfinishorder'));break;
      }
    },
    *showorder( { payload: id },{ select }) {
      const orderItem = (yield select(state=>state.shopdashboard.dataSource)).filter(item => item.id === id) // 取出对应id的订单
      // const uid = orderItem[0].uid ? orderItem[0].uid : '';
      return orderItem;
    },
    *acceptorder({payload},{put,call}) {
      const { data } = yield call(updateOrder,payload)
      console.log(data)
      if (data.errcode === "0") {
        message.success("操作成功!订单已接受", 0.9);
        yield call(delay,1000);
        yield put(routerRedux.push('/shopunacceptorder'))
      } else {
        message.error("操作失败")
      }
    },
    *finishorder({payload},{put,call}) {
      const { data } = yield call(updateOrder,payload)
      console.log(data)
      if (data.errcode === "0") {
        message.success("操作成功!订单已确认完成", 0.9);
        yield call(delay,1000);
        yield put(routerRedux.push('/shopunfinishorder'))
      } else {
        message.error("操作失败")
      }
    },
    *cancelorder({payload},{call,put}) {
      const { data } = yield call(shopCancelOrder,payload)
      console.log(data)
      if (data.errcode === "0") {
        message.success("操作成功!订单已拒绝", 1);
        yield call(delay,1100);
        window.location.reload()
      } else {
        message.error("操作失败")
      }
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
