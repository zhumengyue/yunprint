/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/27
 * Time : 17:57
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Steps, Popconfirm, Modal } from 'antd';
import styles from './OrderList.css'

const Step = Steps.Step;

class OrderList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      itemData: [],
      visible: false,
    }
  }

  render() {
    const { dataSource } = this.props;

    const columns = [{
      title: '序号',
      dataIndex: 'id',
      align: 'center',
    }, {
      width: 350,
      title: '文件名',
      dataIndex: 'filename',
    }, {
      width: 150,
      title: '提供者',
      align: 'center',
      dataIndex: 'name',
    }, {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createtime',
      defaultSortOrder: 'descend',
      sorter : (a,b) => a.createtime.replace(/[\-,:, ]/g, "") - b.createtime.replace(/[\-,:, ]/g, ""),
    }, {
      title: '操作',
      align: 'center',
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

OrderList.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default OrderList;
