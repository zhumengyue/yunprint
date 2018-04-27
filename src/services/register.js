/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 10:07
 * Desc :
 */
import fetch from '../utils/fetch'

export function userRegister (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/login/register',
  });
}export function storeRegister (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/store/login/register',
  });
}

