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
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/order/showorder',
  });
}

export function userFinishOrder(id) {
  return fetch({
    method: 'post',
    data: {oid:id},
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/order/isfinish'
  })
}

export function userCancelOrder(id) {
  return fetch({
    method: 'post',
    data: {oid:id},
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/order/cancelorder'
  })
}

export function getMyFile() {
  return fetch({
    method: 'get',
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/file/getmyfile'
  })
}

export function getAllFile() {
  return fetch({
    method: 'get',
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/file/getpublicfile'
  })
}

export function updateFileStatus(payload) {
  return fetch({
    method: 'post',
    data: {
      fid: payload.id,
      status: payload.status,
    },
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/file/ispublic'
  })
}

export function showStore(){
  return fetch({
    method: 'get',
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/order/showstore'
  })
}
