/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 18:16
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import  UnAccetpList from '../components/Table/UnAccetpList'
import ShopSlider from '../components/Slider/ShopSlider'
import HeaderTitle from '../components/Header/Header'
import cookie from '../utils/cookie'
import styles from './Dashboard/UserDashboard.css'

const { Content } = Layout;

class ShopUnAcceptOrder extends React.Component {

  render() {
    const {shopdashboard, dispatch} = this.props;
    const username = cookie.getCookie('username')
    function handleClick(e) {
      // todo 点击侧栏选项的回调函数
      dispatch({type: 'shopdashboard/switchroute', payload: e})
    }

    function showOrder(id) {
      // todo 点击查看订单详情
      return dispatch({
        type: 'shopdashboard/showorder',
        payload: id,
      })
    }

    const {dataSource} = shopdashboard;
    const realData = dataSource.filter(item => (item.status === 1)) // 筛选符合条件的对象
    const orderListProps = {
      realData: realData,
    }
    return (
      <div className={styles.userindex}>
        <Layout style={{"height": "100%"}} className={styles.layout}>
          <HeaderTitle name={{username: username}}/>
          <Layout>
            <ShopSlider onItemClick={handleClick} openkey={{openKeys: ['2']}} selectkey={{selectedKeys: ['22']}}/>
            <Layout className={styles.contentarea}>
              <Content>
                <UnAccetpList showOrder={showOrder} dataSource={orderListProps.realData}/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
function mapStateToProps({ shopdashboard }) {
  return {shopdashboard} ;
}
ShopUnAcceptOrder.propTypes = {
}
export default connect(mapStateToProps)(ShopUnAcceptOrder)
