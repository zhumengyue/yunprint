/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/27
 * Time : 16:55
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import  ShopFinishList from '../components/Table/ShopFinishList'
import ShopSlider from '../components/Slider/ShopSlider'
import HeaderTitle from '../components/Header/Header'
import styles from './Dashboard/UserDashboard.css'
import cookie from "../utils/cookie";

const { Content } = Layout;

class ShopUnFinishOrder extends React.Component {

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
    const realData = dataSource.filter(item => (item.status === 2)) // 筛选符合条件的对象
    const orderListProps = {
      realData: realData,
    }
    return (
      <div className={styles.userindex}>
        <Layout style={{"height": "100%"}} className={styles.layout}>
          <HeaderTitle name={{username: username}}/>
          <Layout>
            <ShopSlider onItemClick={handleClick} openkey={{openKeys: ['2']}} selectkey={{selectedKeys: ['24']}}/>
            <Layout className={styles.contentarea}>
              <Content>
                <ShopFinishList showOrder={showOrder} dataSource={orderListProps.realData}/>
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
ShopUnFinishOrder.propTypes = {
}
export default connect(mapStateToProps)(ShopUnFinishOrder)
