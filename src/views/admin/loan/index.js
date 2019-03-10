import React, { Component } from 'react';
import * as api from '../../../api/loan';
import { Table, Divider, Tag, Empty } from 'antd';

const { Column, ColumnGroup } = Table;

const columns = [{
  title: '融资编号',
  key: 'basicApplyCode',
}, {
  title: 'basicCertificateNumber',
  dataIndex: 'basicCertificateNumber',
  key: 'basicCertificateNumber',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      { tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={ color } key={ tag }>{ tag.toUpperCase() }</Tag>;
      }) }
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite { record.name }</a>
      <Divider type="vertical"/>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];


class LoanList extends Component {
  constructor() {
    super();
    this.state = {
      name: 'nuo',
      list: []
    };
  }

  async componentDidMount() {
    try {
      const data = await api.fetchLoanList({ pageSize: 40, pageNum: 1, status: 'all' });
      await this.setState({
        list: data.list
      });
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    return (
      <Table dataSource={ this.state.list }
        pagination={ { showSizeChanger: true, defaultPageSize: 10, pageSizeOptions: ['10', '20', '30', '40'] } }>
        <Column
          title="融资编号"
          dataIndex="basicApplyCode"
          key="basicApplyCode"
        />
        <Column
          title="申请证件号"
          dataIndex="basicCertificateNumber"
          key="basicCertificateNumber"
        />
        <Column
          title="产品类型"
          dataIndex="basicProductCode"
          key="basicProductCode"
          render={ (item) => {
            return item + 1;
          } }
        />
        <Column
          title="贷款金额"
          dataIndex="borrowerAmount"
          key="borrowerAmount"
        />
        <Column
          title="进件渠道"
          dataIndex="borrowerApplicationChannel"
          key="borrowerApplicationChannel"
        />
        <Column
          title="客户经理"
          key="customerManager"
          dataIndex="customerManager"
        />
      </Table>
    );
    // }

  }
}

export default LoanList;
