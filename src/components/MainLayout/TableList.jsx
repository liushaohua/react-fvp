import React, { PropTypes } from 'react';
import { Table, Button } from 'antd';
import styles from './TableList.less';

function TimeList() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];

    const data = [];
        for (let i = 0; i < 46; i++) {
          data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
          });
        }

        const pagination = {
          total: data.length,
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => {
            console.log('Current: ', current, '; PageSize: ', pageSize);
          },
          onChange: (current) => {
            console.log('Current: ', current);
          },
      };
   return (
     <div className={styles.tableList}>
        <div className={styles.tableTitle}>
            <span>报表明细</span>
            <span className="tableTitleBtn">
                <a href="javascript:;">导出</a>
                <a href="javascript:;">设置指标</a>
            </span>
        </div>
        <Table columns={columns} dataSource={data} pagination={pagination} />
     </div>
   );
}

TimeList.propTypes = {};

export default TimeList;
