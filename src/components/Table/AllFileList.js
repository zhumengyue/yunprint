/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/28
 * Time : 0:14
 * Desc :
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Icon } from 'antd';


class AllFileList extends React.Component {

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
      dataIndex: 'author',
    }, {
      title: '上传时间',
      align: 'center',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      sorter : (a,b) => a.time.replace(/[\-,:, ]/g, "") - b.time.replace(/[\-,:, ]/g, ""),
    }, {
      title: '操作',
      align: 'center',
      render: (text,record,index) => {
        return(
          <span>
            <Button type="primary" style={{marginLeft: 20}}>
              <a href={'http://yunprint.applinzi.com/YunPrint/public/upload/' + record.savename} download={record.realname}><Icon type="download" />下载</a>
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

AllFileList.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default AllFileList;
