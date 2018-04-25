/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/25
 * Time : 20:12
 * Desc : 订单详情展示
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button,Modal } from 'antd';

class OrderModal extends React.Component {
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  constructor(props){
    super(props)
    this.state = {
      ...props.itemData,
      ...props.visible
    }
  }
  render() {
    return (
      <div>
        <Modal
          title="订单详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // visible={true}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    ) // end retuen()
  } // end render()
}
export default OrderModal
