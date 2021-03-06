/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/25
 * Time : 19:17
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import OrderList from '../components/Table/OrderList'
import Slider from '../components/Slider/Slider'
import HeaderTitle from '../components/Header/Header'
import styles from './Dashboard/UserDashboard.css'
import cookie from '../utils/cookie'

const { Content } = Layout;

const UnFinishOrder =({userdashboard, dispatch}) => {

  function handleClick(e){
    // todo 点击侧栏选项的回调函数
    dispatch({ type: 'userdashboard/switchroute' ,payload: e})
  }
  function showOrder(id) {
    // todo 点击查看订单
    return dispatch({
      type: 'userdashboard/showorder',
      payload: id,
    });
  }
  function userFinishOrder(id) {
    // todo 点击完成订单
    return dispatch({
      type: 'userdashboard/finishorder',
      payload: id,
    });
  }
  const { dataSource } = userdashboard;
  const realData = dataSource.filter(item => (item.status === 1 || item.status === 2))
  const username = cookie.getCookie('username')
  const orderListProps = {
    dataSource: realData,
  }
  return(
    <div className={styles.userindex}>
      <Layout style={{"height":"100%"}} className={styles.layout}>
        <HeaderTitle name={{username:username}}/>
        <Layout>
          <Slider onItemClick={handleClick} openkey={{openKeys:['2']}} selectkey={{selectedKeys:['23']}}/>
          <Layout className={styles.contentarea}>
            <Content>
              <OrderList showOrder={showOrder} userFinishOrder={userFinishOrder} dataSource= {orderListProps.dataSource}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
function mapStateToProps({ userdashboard}) {
  return {userdashboard} ;
}
UnFinishOrder.propTypes = {
}
export default connect(mapStateToProps)(UnFinishOrder)
