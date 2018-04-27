/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/25
 * Time : 13:24
 * Desc :
 */
const cookie = {
  /**
   * 设置cookie
   * @param name cookie的名称
   * @param value cookie的值
   * @param day cookie的过期时间
   */
  setCookie : (name, value, day) => {
    if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000;
      var date = new Date(+new Date()+expires);
      document.cookie = name + "=" + value + ";expires=" + date.toUTCString();
    }else{
      document.cookie = name + "=" + value;
    }
  },

  /**
   * 获取对应名称的cookie
   * @param name cookie的名称
   * @returns {null} 不存在时，返回null
   */
  getCookie : (name) => {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg)
    if (arr)
      return arr[2];
    else
      return null;
  },

  /**
   * 删除cookie
   * @param name cookie的名称
   */
  // delCookie : (name) => {
  //   this.setCookie(name, '', -1);
  // }
}
export default cookie
