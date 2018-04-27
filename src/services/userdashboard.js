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

export function userFinishOrder(id) {
  return fetch({
    method: 'post',
    data: {oid:id},
    url: 'http://localhost/YunPrint/public/user/order/isfinish'
  })
}

export function userCancelOrder(id) {
  return fetch({
    method: 'post',
    data: {oid:id},
    url: 'http://localhost/YunPrint/public/user/order/cancelorder'
  })
}

export function getAllFile() {
  return fetch({
    method: 'get',
    url: 'http://localhost:8000/api/users'
  })
}
