/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 19:30
 * Desc :
 */
import fetch from '../utils/fetch'

export function getOrderList() {
  return fetch({
    method: 'get',
    url: 'http://localhost/YunPrint/public/user/order/showorder',
  });
}
