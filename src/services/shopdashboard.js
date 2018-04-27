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
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/store/order/showorder',
  });
}

export function updateOrder(id) {
  return fetch({
    method: 'post',
    data: {oid:id},
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/store/order/changestatus',
  });
}

