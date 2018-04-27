/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 20:00
 * Desc :
 */
import fetch from '../utils/fetch'

export function userdellogin (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/login/dellogin',
  });
}
