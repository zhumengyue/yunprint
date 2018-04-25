/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/25
 * Time : 13:42
 * Desc :
 */
export default {
  namespace: 'orderlist',
  state: [],
  effect: {
    *showorder(state, { payload: id }) {
      console.log(state)
    },
  },
  reducers: {
  },
};
