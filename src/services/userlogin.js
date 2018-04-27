/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:21
 * Desc :
 */
import fetch from '../utils/fetch'

export function userlogin (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/login/oklogin',
  });
}
