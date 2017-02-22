import React, { PropTypes } from 'react';
import {DatePicker, Button, Radio, Icon, Dropdown, Menu, Checkbox} from 'antd';
import moment from 'moment';
import styles from './TimeBar.less';
import Search from '../home/search.jsx';
const { MonthPicker, RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function TimeBar({
        date, onChange, modalV, changeModalV
    }) {

    let handleSizeChange = (e) => {
        alert(3);
    },

    dateOther = (e) => {
      console.log(`checked =`);
    };

    const SearchProp = {modalV,changeModalV};

    console.log(modalV,'op[[]]');

   return (
     <div className="changeBtnBox">
         <RadioGroup defaultValue="-1" onChange={onChange}>
             <RadioButton value="-1">昨天</RadioButton>
             <RadioButton value="7">近7日</RadioButton>
             <RadioButton value="30">近30日</RadioButton>
         </RadioGroup>&emsp;
         <DatePicker defaultValue={moment(date)} onChange={onChange} />&emsp;
         <span><Checkbox onChange={dateOther}>与其他时间对比</Checkbox></span>
         <DatePicker defaultValue={moment(date)} onChange={onChange} disabled/>&emsp;
         <RadioGroup defaultValue="day" onChange={onChange}>
             <RadioButton value="a">按时</RadioButton>
             <RadioButton value="day">按日</RadioButton>
             <RadioButton value="weak">按周</RadioButton>
             <RadioButton value="yue">按月</RadioButton>
         </RadioGroup>&emsp;
         <Button type="ghost" onClick={changeModalV.bind(this,true)}>筛选</Button>
         <Search {...SearchProp}/>
     </div>
   );
}

TimeBar.propTypes = {};

export default TimeBar;
