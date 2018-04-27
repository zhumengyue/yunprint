/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/27
 * Time : 17:57
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Icon } from 'antd';
import styles from './MyList.css'

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
      render: (text,record,index) => index+1,
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
      render: (name) => name.slice(0,1) + `${ name.slice(1).length === 2 ? '某某' : '某'}`
    }, {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createtime',
      defaultSortOrder: 'descend',
      sorter : (a,b) => a.createtime.replace(/[\-,:, ]/g, "") - b.createtime.replace(/[\-,:, ]/g, ""),
    }, {
      title: '操作',
      align: 'center',
      render: (text, record,index ) => {
        return(
          <span>
            { record.status === 0 ?
            <Popconfirm title="确定公开此文件到云资料库吗?" okText="是" cancelText="否" >
              <Button type="primary" icon="folder-open"className={styles.openbtn} >公开</Button>
            </Popconfirm> :
              <Button type="primary" disabled icon="folder-open" className={styles.openedbtn}>已公开</Button>
            }
            <Popconfirm title="确定删除此文件吗？" okText="是" cancelText="否">
              <Button type="primary" icon="delete" className={styles.deletebtn}>删除</Button>
            </Popconfirm>
            <Button type="primary" className={styles.downbtn}>
              <a href={'http://localhost/YunPrint/public/upload/' + record.savename} download={record.realname}><Icon type="download" />下载</a>
            </Button>
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
      </div>
    )
  }
};

OrderList.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default OrderList;