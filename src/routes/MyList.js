/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/27
 * Time : 17:37
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import MyFileList from '../components/Table/MyFileList'
import Slider from '../components/Slider/Slider'
import HeaderTitle from '../components/Header/Header'
import styles from './Dashboard/UserDashboard.css'
import cookie from '../utils/cookie'

const { Content } = Layout;

const MyList =({userdashboard, dispatch}) => {

  function handleClick(e){
    // todo 点击侧栏选项的回调函数
    dispatch({ type: 'userdashboard/switchroute' ,payload: e})
  }

  function updateFileStatus(record) {
    // todo 更新文件公开状态  status： 0 <==> 1
    dispatch({ type: 'userdashboard/updatefilestatus' ,payload: record})
  }

  const { filedataSource } = userdashboard;
  const username = cookie.getCookie('username')

  return(
    <div className={styles.userindex}>
      <Layout style={{"height":"100%"}} className={styles.layout}>
        <HeaderTitle name={{username:username}}/>
        <Layout>
          <Slider onItemClick={handleClick} openkey={{openKeys:['1']}} selectkey={{selectedKeys:['11']}}/>
          <Layout className={styles.contentarea}>
            <Content>
              <MyFileList updateFileStatus={updateFileStatus} dataSource= {filedataSource}/>
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
MyList.propTypes = {
}
export default connect(mapStateToProps)(MyList)
