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
import  OrderTable from '../../components/Table/OrderList'
import Slider from '../../components/Slider/Slider'
import HeaderTitle from '../../components/Header/Header'
import styles from './UserDashboard.css'

const { Content } = Layout;

const UserDashboard =({userdashboard, dispatch}) => {
  function handleClick(e){
    // console.log(e)
    dispatch({ type: 'userdashboard/goto'})
  }

  function handleDelLogin(e) {
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
            <Slider onItemClick={handleClick} openkey={{openKeys:['2']}}/>
            <Layout className={styles.contentarea}>
              <Content>
                <OrderTable dataSource= {orderListProps.dataSource}/>
              </Content>
            </Layout>
         </Layout>
        </Layout>
      </div>
    )
}
function mapStateToProps({ userdashboard }) {
  return {userdashboard};
}
UserDashboard.propTypes = {
}
export default connect(mapStateToProps)(UserDashboard)
