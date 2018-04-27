/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 18:13
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Icon } from 'antd';

class UnFinishList extends React.Component {

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

    const modalColumns = [{
      title: '文件名',
      dataIndex: 'name',
    },{
      title: '数量',
      dataIndex: 'num',
      align: 'center',
    },{
      title: '打印类型',
      colSpan: 2,
      dataIndex: 'color',
      align: 'center',
      render: (value, row, index) => {
        if(row.color === 0) return '黑白'
        else return '彩色'
      }
    },{
      dataIndex: 'style',
      colSpan: 0,
      align: 'center',
      render: (value, row, index) => {
        if(row.style === 0) return '单页'
        else return '双页'
      }
    },]

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
          if(file2 === null) {
            return (<span><p>{file1.realname}</p></span>)
          }else if(file3 === null ){
            return(<span><p>{file1.realname}</p><p>{file2.realname}</p></span>)
          } else {
            return(<span><p>{file1.realname}</p><p>{file2.realname}</p><p>{file3.realname}</p></span>)
          }
        }
      },
    }, {
      title: '打印信息',
      dataIndex: 'file1color',
      width: 80,
      align: 'center',
      colSpan: 3,
      render: (value, row, index) => {
        return(
          <span>
            <p>{row.file1color ? '彩色' : '黑白'}</p>
            <p>{row.file2color ? '彩色' : '黑白'}</p>
            <p>{row.file3color ? '彩色' : '黑白'}</p>
          </span>
        )
      },
    }, {
      dataIndex: 'file1style',
      width: 80,
      align: 'center',
      colSpan: 0,
      render: (value, row, index) => {
        return(
          <span>
            <p>{row.file1style ? '双页' : '单页'}</p>
            <p>{row.file2style ? '双页' : '单页'}</p>
            <p>{row.file3style ? '双页' : '单页'}</p>
          </span>
        )
      },
    }, {
      dataIndex: 'file1num',
      width: 80,
      align: 'center',
      colSpan: 0,
      render: (value, row, index) => {
        return(
          <span>
            <p>{row.file1num + '份'}</p>
            <p>{row.file2num + '份'}</p>
            <p>{row.file3num + '份'}</p>
          </span>
        )
      },
    }, {
      title: '备注',
      width: 300,
      dataIndex: 'remark',
      render: (remark) => { return remark ? remark : '该用户未留备注'}
    }, {
      title: '操作',
      dataIndex: 'sid',
      align: 'center',
      colSpan: 2,
      render: (value, row, index) => {
        return(
          <span>
            <p><a><Icon type="printer" />&nbsp;打印</a></p>
            <p><a><Icon type="printer" />&nbsp;打印</a></p>
            <p><a><Icon type="printer" />&nbsp;打印</a></p>
          </span>
        )
      }
    }, {
      dataIndex: 'uid',
      align: 'center',
      colSpan: 0,
      render: (value, row, index) => {
        return(
          <span>
            <p><a><Icon type="download" />&nbsp;&nbsp;下载</a></p>
            <p><a><Icon type="download" />&nbsp;&nbsp;下载</a></p>
            <p><a><Icon type="download" />&nbsp;&nbsp;下载</a></p>
          </span>
        )
      }
    }];
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
        <Modal
          title="订单详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <Table dataSource={this.state.itemData} columns={modalColumns} rowKey="id"/>
        </Modal>
      </div>
    )
  }
};

UnFinishList.propTypes = {
  showOrder: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default UnFinishList;
