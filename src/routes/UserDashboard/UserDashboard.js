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
import styles from './UserDashboard.css'

const { Content } = Layout;

const UserDashboard =({userdashboard, dispatch}) => {
  function handleClick(e){
    // todo 点击侧栏选项的回调函数
    dispatch({ type: 'userdashboard/switch' ,payload: e})
  }
  function showOrder(id) {
    // todo 点击查看订单
    dispatch({
      type: 'userdashboard/showorder',
      payload: id,
    });
  }
  const { dataSource } = userdashboard;
  const orderListProps = {
    dataSource: dataSource,
  }
    return(
      <div className={styles.userindex}>
        <Layout style={{"height":"100%"}} className={styles.layout}>
          <HeaderTitle name={{realname:'zmy'}}/>
          <Layout>
            <Slider onItemClick={handleClick} openkey={{openKeys:['2']}} selectkey={{selectedKeys:['21']}}/>
            <Layout className={styles.contentarea}>
              <Content>
                <OrderList showOrder={showOrder} dataSource= {orderListProps.dataSource}/>
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
UserDashboard.propTypes = {
}
export default connect(mapStateToProps)(UserDashboard)
