import React, { PropTypes } from 'react';
import { Spin, Alert, Switch, BackTop } from 'antd';

function HomeLoading({
        tLoading,
        onChangeLoading,
        handleClick
    }) {
    const container = (
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
          />
    );

    return (
        <div>
          <BackTop />    
          <Spin spinning={tLoading} >{container}</Spin>
          Loading state：<Switch checked={tLoading} onChange={onChangeLoading} />
          &emsp;&emsp;&emsp;<a href="javascript:;" onClick={handleClick}>click</a>
        </div>
    );
}

HomeLoading.propTypes = {
  Tloading: PropTypes.any
};

export default HomeLoading;
