/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 17:17
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import  ShopOrderList from '../../components/Table/ShopOrderList'
import ShopSlider from '../../components/Slider/ShopSlider'
import HeaderTitle from '../../components/Header/Header'
import styles from './UserDashboard.css'
import cookie from "../../utils/cookie";

const { Content } = Layout;

class ShopDashboard extends React.Component {

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
    const orderListProps = {
      dataSource: dataSource,
    }
    return (
      <div className={styles.userindex}>
        <Layout style={{"height": "100%"}} className={styles.layout}>
          <HeaderTitle name={{username: username}}/>
          <Layout>
            <ShopSlider onItemClick={handleClick} openkey={{openKeys: ['2']}} selectkey={{selectedKeys: ['21']}}/>
            <Layout className={styles.contentarea}>
              <Content>
                <ShopOrderList showOrder={showOrder} dataSource={orderListProps.dataSource}/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
function mapStateToProps({ shopdashboard}) {
  return {shopdashboard} ;
}
ShopDashboard.propTypes = {
}
export default connect(mapStateToProps)(ShopDashboard)
