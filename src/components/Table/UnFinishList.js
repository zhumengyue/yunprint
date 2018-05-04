/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 18:13
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Icon, Popconfirm } from 'antd';
import styles from './UnFinishList.css'
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
    const { dataSource, shopFinishOrder } = this.props;

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
            return (<span><p className={styles.ptitle}>{file1.filename}</p></span>)
          }else if(file3 === null ){
            return(<span><p className={styles.ptitle}>{file1.filename}</p><p className={styles.ptitle}>{file2.filename}</p></span>)
          } else {
            return(<span><p className={styles.ptitle}>{file1.filename}</p><p className={styles.ptitle}>{file2.filename}</p><p className={styles.ptitle}>{file3.filename}</p></span>)
          }
        }
      },
    }, {
      title: '打印信息',
      dataIndex: 'file1color',
      width: 60,
      align: 'center',
      colSpan: 3,
      render: (value, row, index) => {
        let
          file2 = row.file2info,
          file3 = row.file3info;
        return(
          <span>
            <p>{row.file1color ? '彩色' : '黑白'}</p>
            { file2 === null ? null : <p>{row.file2color ? '彩色' : '黑白'}</p> }
            { file3 === null ? null : <p>{row.file3color ? '彩色' : '黑白'}</p> }
          </span>
        )
      },
    }, {
      dataIndex: 'file1style',
      width: 60,
      align: 'center',
      colSpan: 0,
      render: (value, row, index) => {
        let
          file2 = row.file2info,
          file3 = row.file3info;
        return(
          <span>
            <p>{row.file1style ? '双页' : '单页'}</p>
            { file2 === null ? null : <p>{row.file2style ? '双页' : '单页'}</p> }
            { file3 === null ? null : <p>{row.file3style ? '双页' : '单页'}</p> }
          </span>
        )
      },
    }, {
      dataIndex: 'file1num',
      width: 70,
      align: 'center',
      colSpan: 0,
      render: (value, row, index) => {
        let
          file2 = row.file2info,
          file3 = row.file3info;
        return(
          <span>
            <p>{row.file1num + '份'}</p>
            { file2 === null ? null : <p>{row.file2num + '份'}</p> }
            { file3 === null ? null : <p>{row.file3num + '份'}</p> }
          </span>
        )
      },
    }, {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createtime',
      defaultSortOrder: 'descend',
      sorter : (a,b) => a.createtime.replace(/[\-,:, ]/g, "") - b.createtime.replace(/[\-,:, ]/g, ""),
      key: 4,
    }, {
      title: '操作',
      dataIndex: 'sid',
      align: 'center',
      width: 70,
      colSpan: 2,
      render: (value, row, index) => {
        let
          file1 = row.file1info,
          file2 = row.file2info,
          file3 = row.file3info;
        return(
          <span>
            {file1 === null ? '' :
                <Button type="primary">
                  <a href={'http://yunprint.applinzi.com/YunPrint/public/upload/' + file1.savename}
                     download={file1.filename}><Icon type="download"/>下载</a>
                </Button>
            }
            { file2 === null ? null :
                <Button type="primary" style={{marginTop: 8}}>
                  <a href={'http://yunprint.applinzi.com/YunPrint/public/upload/' + file2.savename} download={file2.filename}><Icon type="download" />下载</a>
                </Button>
            }
            { file3 === null ? null :
                <Button type="primary" style={{marginTop: 8}}>
                  <a href={'http://yunprint.applinzi.com/YunPrint/public/upload/' + file3.savename} download={file3.filename}><Icon type="download" />下载</a>
                </Button>
            }
          </span>
        )
      }
    },{
      dataIndex: 'finishtime',
      align: 'center',
      colSpan: 0,
      width: 70,
      render: (value, row, index) => {
        return(
          <span>
            <Popconfirm title="是否确认完成订单？" onConfirm={()=>shopFinishOrder(row.id)} >
              <Button type="primary" >
                确认完成
              </Button>
            </Popconfirm>
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
