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
      render: (author) => {
        if (author)
          return  author.slice(0,1) + `${ author.slice(1).length === 2 ? '某某' : '某'}`
        else return author
      }
    }, {
      title: '创建时间',
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
            <Popconfirm title="将此文件加入我的资料库？" okText="是" cancelText="否">
              <Button type="primary" icon="star-o" style={{marginRight: 20}}>收藏</Button>

            </Popconfirm>
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
