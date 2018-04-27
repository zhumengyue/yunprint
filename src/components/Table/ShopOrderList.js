/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 17:54
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Steps } from 'antd';
import styles from './OrderList.css'

const Step = Steps.Step;

class ShopOrderList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      itemData: [],
      visible: false,
    }
  }
  handleOk = (e) => { // 对话框ok按钮
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => { // 对话框cancel按钮
    this.setState({
      visible: false,
    });
  }

  render() {
    const { dataSource } = this.props;

    const columns = [{
      title: '订单号',
      dataIndex: 'id',
      align: 'center',
      width: 100,
    }, {
      width: 350,
      title: '文件名',
      render: (data) => {
        let
          file1 = data.file1info,
          file2 = data.file2info,
          file3 = data.file3info;
        if(file1 !== null) {
          if(file2===null) {
            return (<span><p>{file1.realname}</p></span>)
          }else if(file3 === null ){
            return(<span><p>{file1.realname}</p><p>{file2.realname}</p></span>)
          } else {
            return(<span><p>{file1.realname}</p><p>{file2.realname}</p><p>{file3.realname}</p></span>)
          }
        }
      },
      key: 2,
    }, {
      width: 150,
      title: '文件状态',
      dataIndex: 'status',
      sorter : (a,b) => a.status - b.status,
      render: (status) => {
        return (
          <Steps current={ status===9 ? 0 : status} status={status===9 ? 'error' : 'process'} progressDot={true} size='small' className={styles.liststep}>
            <Step title={status===9 ? '用户已取消' : '待接取'} />
            <Step title="待完成"/>
            <Step title="待领取"/>
            <Step title="已完成"/>
          </Steps>
        );
      },
      key: 3,
    }, {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createtime',
      defaultSortOrder: 'descend',
      sorter : (a,b) => a.createtime.replace(/[\-,:, ]/g, "") - b.createtime.replace(/[\-,:, ]/g, ""),
      key: 4,
    }];
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </div>
    )
  }
};

ShopOrderList.propTypes = {
  showOrder: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default ShopOrderList;
