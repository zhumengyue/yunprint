/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 17:42
 * Desc :
 */
import fetch from '../utils/fetch'

export function getOrderList() {
  return fetch({
    method: 'get',
    url: 'http://localhost/YunPrint/public/store/order/showorder',
  });
}
