/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/23
 * Time : 19:21
 * Desc :
 */
import fetch from '../utils/fetch'
import axios from 'axios'

export function login (data) {
  return fetch({
    method: 'post',
    data: data,
    url: 'http://localhost/YunPrint/public/user/login/oklogin',
  });
  // return axios.post("http://localhost/YunPrint/public/user/login/oklogin",data);
}
