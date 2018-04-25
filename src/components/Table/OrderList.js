/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 18:57
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Steps,Popconfirm } from 'antd';
import styles from './OrderList.css'

const Step = Steps.Step;

const OrderList = ({ showOrder, dataSource }) => {
  const columns = [{
    title: '订单号',
    dataIndex: 'id',
    align: 'center',
    width: 100,
  }, {
    width: 250,
    title: '文件名',
    align: 'center',
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
    key: 2,
  }, {
    width: 150,
    title: '文件状态',
    dataIndex: 'status',
    render: (status) => {
      return (
        <Steps current={status-1} progressDot={true} size='small' className={styles.liststep}>
          <Step title="待接取"/>
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
  }, {
    title: '操作',
    align: 'center',
    dataIndex: 'status1',
    render: ( text, record ) => {
      if (record.status == 1){
        console.log(text)
        console.log(record)
        return (
          <span>
            <Button type="primary" className={styles.orderbtn1} onClick={()=>showOrder(record.id)}>
              订单详情
            </Button>
            <Popconfirm title="是否取消订单？" onConfirm={()=>{}} className='orderbtn'>
              <Button type="primary" className={styles.orderbtn2}>
                取消订单
              </Button>
            </Popconfirm>
          </span>
        );
      } else if (record.status == 2 || record.status == 3){
        return (
          <span>
            <Button type="primary" className={styles.orderbtn1} onClick={()=>showOrder(record.id)}>
              订单详情
            </Button>
            <Popconfirm title="是否取消订单？" onConfirm={()=>{}} className='orderbtn'>
              <Button type="primary" disabled className={styles.orderbtn2}>
                取消订单
              </Button>
            </Popconfirm>
          </span>
        )
      } else {
        return (
          <span>
            <Button type="primary" className={styles.orderbtn1} onClick={()=>showOrder(record.id)}>
              订单详情
            </Button>
            <Popconfirm title="是否确认订单？" onConfirm={()=>{}} className='orderbtn'>
              <Button type="primary" className={styles.orderbtn2}>
                确认订单
              </Button>
            </Popconfirm>
          </span>
        );
      }
    },
    key: 5
  }];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      // rowKey="id"
    />
  );
};

OrderList.propTypes = {
  showOrder: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default OrderList;
