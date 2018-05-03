/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/5/3
 * Time : 15:00
 * Desc :
 */
import fetch from '../utils/fetch'

export function getUserInfo () {
  // todo 获取用户信息
  return fetch({
    method: 'get',
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/login/userinfo',
  });
}

export function getShopInfo () {
  // todo 获取商户信息
  return fetch({
    method: 'get',
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/store/mine/storeinfo',
  });
}

export function updateUserInfo (payload) {
  // todo 更改用户信息
  return fetch({
    method: 'post',
    data: payload,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/login/editinfo',
  });
}

export function updateShopInfo (payload) {
  // todo 更改商户信息
  return fetch({
    method: 'post',
    data: payload,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/store/mine/editinfo',
  });
}
