/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 10:07
 * Desc :
 */
import fetch from '../utils/fetch'

export function register (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://localhost/YunPrint/public/user/login/register',
  });
}