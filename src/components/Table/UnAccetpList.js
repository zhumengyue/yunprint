/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 18:13
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Steps, Popconfirm, Modal } from 'antd';
import styles from './ShopOrderList.css'

const Step = Steps.Step;

class UnAccetpList extends React.Component {

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
    const { showOrder, dataSource, shopAcceptOrder } = this.props;
    let updateItemData = (id) => {
      showOrder(id).then(res=>{
        console.log(res);
        this.setState({itemData:[{
            name: res[0].file1info.filename,
            num: res[0].file1num,
            style: res[0].file1style,
            color: res[0].file1color
          }]
        })
        if(res[0].file2info != null){
          this.setState({itemData: this.state.itemData.concat([{
              name: res[0].file2info.filename,
              num: res[0].file2num,
              style: res[0].file2style,
              color: res[0].file2color
            }])
          })
        }
        if(res[0].file3info != null){
          this.setState({itemData: this.state.itemData.concat([{
              name: res[0].file3info.filename,
              num: res[0].file3num,
              style: res[0].file3style,
              color: res[0].file3color
            }])
          })
        }
        this.setState({visible:true})
      })
    }

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
        if(file1 != null) {
          if(file2==null) {
            return (<span><p>{file1.filename}</p></span>)
          }else if(file3 == null ){
            return(<span><p>{file1.filename}</p><p>{file2.filename}</p></span>)
          } else {
            return(<span><p>{file1.filename}</p><p>{file2.filename}</p><p>{file3.filename}</p></span>)
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
          <Steps current={status} progressDot={true} size='small'>
            <Step title="待接取"/>
            <Step title="待完成"/>
            <Step title="待领取"/>
            <Step title="已完成"/>
          </Steps>
        );
      },
      key: 3,
    }, {
      title: '操作',
      align: 'center',
      dataIndex: 'status1',
      render: ( text, record ) => {
        return (
          <span>
            <Button type="primary" className={styles.orderbtn1} onClick={() => updateItemData(record.id)}>
              订单详情
            </Button>
            <Popconfirm title="是否接受订单？" onConfirm={()=>shopAcceptOrder(record.id)} className='orderbtn'>
              <Button type="primary" className={styles.orderbtn2}>
                接受订单
              </Button>
            </Popconfirm>
            <Popconfirm title="是否拒绝订单？" onConfirm={()=>{}} className='orderbtn'>
              <Button type="primary" className={styles.orderbtn3}>
                拒绝订单
              </Button>
            </Popconfirm>
          </span>
        );
      },
      key: 5
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

UnAccetpList.propTypes = {
  showOrder: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
};

export default UnAccetpList;
