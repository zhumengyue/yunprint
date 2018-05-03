/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 14:15
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import  OrderList from '../../components/Table/OrderList'
import Slider from '../../components/Slider/Slider'
import HeaderTitle from '../../components/Header/Header'
import cookie from '../../utils/cookie'

import styles from './UserDashboard.css'

const { Content } = Layout;

class UserDashboard extends React.Component {

  render() {

    const { userdashboard, dispatch } = this.props;
    const username = cookie.getCookie('username')
    function handleClick(e) {
      // todo 点击侧栏选项的回调函数
      dispatch({type: 'userdashboard/switchroute', payload: e})
    }

    function showOrder(id) {
      // todo 点击查看订单详情
      return dispatch({
        type: 'userdashboard/showorder',
        payload: id,
      })
    }

    function userFinishOrder(id) {
      // todo 用户完成订单   status --> 4
      dispatch({
        type: 'userdashboard/finishorder',
        payload: id,
      })
    }

    function userCancelOrder(id) {
      // todo 用户取消订单   status --> 9
      dispatch({
        type: 'userdashboard/cancelorder',
        payload: id,
      })
    }

    const {dataSource} = userdashboard;
    const orderListProps = {
      dataSource: dataSource,
    }
    return (
      <div className={styles.userindex}>
        <Layout style={{"height": "100%"}} className={styles.layout}>
          <HeaderTitle name={{username:username}}/>
          <Layout>
            <Slider onItemClick={handleClick} openkey={{openKeys: ['2']}} selectkey={{selectedKeys: ['21']}}/>
            <Layout className={styles.contentarea}>
              <Content>
                <OrderList
                  userFinishOrder={userFinishOrder}
                  userCancelOrder={userCancelOrder}
                  showOrder={showOrder}
                  dataSource={orderListProps.dataSource}
                />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
function mapStateToProps({ userdashboard}) {
  return {userdashboard} ;
}
UserDashboard.propTypes = {
}
export default connect(mapStateToProps)(UserDashboard)
