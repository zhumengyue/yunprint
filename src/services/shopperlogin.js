/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 15:40
 * Desc :
 */
import fetch from '../utils/fetch'

export function shopperlogin (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/store/login/oklogin',
  });
}
