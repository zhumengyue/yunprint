/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:21
 * Desc :
 */
import fetch from '../utils/fetch'

export function login (data) {
  return fetch({
    url: 'http://localhost/YunPrint/public/user/login/oklogin',
    method: 'post',
    data,
  })
}
