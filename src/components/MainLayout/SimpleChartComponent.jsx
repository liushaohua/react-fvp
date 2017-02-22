import React, { PropTypes } from 'react';
import { Select } from 'antd';
import {ReactEcharts,echarts} from '../../lib/echarts-for-react';
const Option = Select.Option;

import styles from './SimpleChartComponent.less';


function SimpleChartComponent({
        children, location, option, onChartReady,refChart, chartsLoading
    }) {

    const handleMenuClick = (e) => {
      console.log('click', e);
    },

    handleChange = (value) => {
      console.log(`selected ${value}`);
    },

    handleButtonClick = (e) => {
       console.log('click', e);
    };


    return (
      <div className='chartsBox'>
          <div className='chartsWrap'>
              <div className={styles.singleChart}>
                  <Select defaultValue="指标" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>

                  <ReactEcharts
                      option={option}
                      style={{height: '350px', width: '100%'}}
                      onChartReady={onChartReady}
                      showLoading={chartsLoading}
                      refChart={refChart}
                      className='react_for_echarts' />
              </div>
          </div>
      </div>
    );
}

export {SimpleChartComponent,echarts};
