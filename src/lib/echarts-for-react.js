import echarts from 'echarts';
import React from 'react';

import elementResizeEvent from 'element-resize-event';

const ReactEcharts = React.createClass({
    propTypes: {
        option: React.PropTypes.object.isRequired,
        notMerge: React.PropTypes.bool,
        lazyUpdate: React.PropTypes.bool,
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        theme: React.PropTypes.string,
        onChartReady: React.PropTypes.func,
        showLoading: React.PropTypes.bool,
        onEvents: React.PropTypes.object
    },
    // first add
    componentDidMount() {
        let echartObj = this.renderEchartDom();
        let onEvents = this.props.onEvents || {};

        this.bindEvents(echartObj, onEvents);
        // on chart ready
        if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj,this);

        // on resize
        elementResizeEvent(this.refs[this.props.refChart], function() {
            echartObj.resize();
        });
    },
    // update
    componentDidUpdate() {
        this.renderEchartDom();
        this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
    },
    // remove
    componentWillUnmount() {
        echarts.dispose(this.refs[this.props.refChart])
    },

    //bind the events
    bindEvents(instance, events) {
        var _loop = function _loop(eventName) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
                // binding event
                instance.off(eventName);
                instance.on(eventName, function(param) {
                    events[eventName](param, instance);
                });
            }
        };

        for (var eventName in events) {
            _loop(eventName);
        }

    },
    // render the dom
    renderEchartDom() {
        // init the echart object
        let echartObj = this.getEchartsInstance();
        // set the echart option
        //echartObj.clear();
        echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
        // set loading mask
        if (this.props.showLoading) echartObj.showLoading();
        else echartObj.hideLoading();

        return echartObj;
    },
    getEchartsInstance() {
        // return the echart object
        return echarts.getInstanceByDom(this.refs[this.props.refChart]) || echarts.init(this.refs[this.props.refChart], this.props.theme);
    },
    render() {
        let style = this.props.style || {
            height: '300px'
        };
        // for render
        return (
            <div ref={this.props.refChart}
                id={this.props.refChart}
                className={this.props.className}
                style={style} />
        );
    }
});

export {ReactEcharts,echarts};
