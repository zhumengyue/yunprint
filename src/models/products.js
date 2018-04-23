/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:53
 * Desc :
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
