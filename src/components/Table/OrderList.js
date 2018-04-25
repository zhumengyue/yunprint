/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 18:57
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popover, Button, Steps,Popconfirm } from 'antd';

const Step = Steps.Step;
const customDot = (dot, { status, index }) => (
  <Popover content={<span>step {index} status: {status}</span>}>
    {dot}
  </Popover>
);

const OrderList = ({ onDelete, dataSource }) => {
  const columns = [{
    title: '订单号',
    dataIndex: 'id',
  }, {
    title: '文件名',
    render: (data) => {
      let
        file1 = data.file1info,
        file2 = data.file2info,
        file3 = data.file3info;
      if(file1 != null) {
        if(file2==null) {
          return (<span><p>{file1.realname}</p></span>)
        }else if(file3 == null ){
          return(<span><p>{file1.realname}</p><p>{file2.realname}</p></span>)
        } else {
          return(<span><p>{file1.realname}</p><p>{file2.realname}</p><p>{file3.realname}</p></span>)
        }
      }

    },
  }, {
    title: '文件状态',
    dataIndex: 'status',
    render: (status) => {
      return (
        <Steps current={status} progressDot={customDot} size='small' className='liststeps'>
          <Step className='liststepsitem' title="待接取"/>
          <Step className='liststepsitem' title="待完成"/>
          <Step className='liststepsitem' title="待领取"/>
          <Step className='liststepsitem' title="已完成"/>
        </Steps>
      );
    },
  }, {
    title: '创建时间',
    dataIndex: 'createtime',
  }, {
    title: '操作',
    dataIndex: 'file3id',
    render: (text, record, type) => {
      if (type==1 || type==2){
        return (
          <span>
        <Button type="primary" className='orderbtn'>
          订单详情
        </Button>
        <Popconfirm title="是否取消订单？" onConfirm={()=>{}} className='orderbtn'>
          <Button type="primary" className='orderbtn'>
          取消订单
        </Button>
        </Popconfirm>
        </span>
        );
      } else {
        return (
          <span>
        <Button type="primary" className='orderbtn'>
          订单详情
        </Button>
        <Popconfirm title="是否确认订单？" onConfirm={()=>{}} className='orderbtn'>
          <Button type="primary" className='orderbtn'>
          确认订单
        </Button>
        </Popconfirm>
        </span>
        );
      }
    },
  }];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
    />
  );
};

OrderList.propTypes = {
  // onDelete: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default OrderList;
