/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/21
 * Time : 17:15
 */
export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
