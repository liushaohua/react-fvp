import React, { PropTypes } from 'react';
import { Spin, Alert, Switch, BackTop, Modal} from 'antd';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      citys: [{name:'阿里', 'id':'002'}],
      abc:[{'name': 'A', 'id': '001'}, {'name': 'B', 'id': '002'}],
      cityObj: {},
      businesssObj: {},
      businesss: [{name:'全业务线','id':'101'}, {name:'二手车','id':'102'}, {name:'二手创新','id':'103'}],
      businesssQuerys: [],
      authorityCitys: [{name:'全国','id':'001'}, {name:'澳大利亚','id':'003'}, {name:'澳门','id':'004'}],
      queryCitys: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      console.log(3);
  }

  handleClick() {
    this.setState({liked: !this.state.liked});
  }

  /**
   * [setQueryArr 删除匹配值]
   * @param  {[dom obj]} ev [触发元素的dom对象]
   * @return {}     [null]
   */
  setQueryArr(item, stateName, resetName) {
      let {id, name} = item,
          {state} = this,
          stateHash = {
              'queryCitys': 'cityObj',
              'businesssQuerys': 'businesssObj'
          },
          option = {
              stateName: stateHash[stateName]
          },
          pushCitys = () => {
              var bool = false,
                  cityArr = state[stateName],

                  /**
                   * [spliceCitys 删除匹配值]
                   * @param  {[string]} str [id值]
                   * @return {}     [null]
                   */
                  spliceCitys = (str) => {
                      for (let i = 0, len = cityArr.length; i < len; i++) {
                          if (cityArr[i]['id'] == str) {
                              cityArr.splice(i,1);
                              delete state[option.stateName][str];
                              break;
                          }
                      }
                  },

                  /**
                   * [updateClass 更新CSS JSON tree]
                   * @return {} [null]
                   */
                  updateClass = () => {
                      let mapObj = {
                          'queryCitys': 'authorityCitys',
                          'businesssQuerys': 'businesss'
                      };

                      for (let i = 0, len = state[mapObj[stateName]].length; i < len; i++) {
                          let listObj = state[mapObj[stateName]][i];
                          delete listObj.active;
                          if (this.state[option.stateName][listObj.id]) {
                              listObj.active = true;
                          }
                      }

                      let stateObj = {};
                      stateObj[mapObj[stateName]] = state[mapObj[stateName]];
                      this.setState(stateObj);
                  };

              //重置
              if (id == resetName && !this.state[option.stateName][resetName]) {
                  cityArr.length = 0;
                  this.state[option.stateName] = {};
              }

              !this.state[option.stateName][id] && (function () {
                  bool = true;
                  state[option.stateName][id] = 1;
              } ());

              if (bool) {
                  cityArr.push({id, name});
              } else {
                  spliceCitys(id);
              }

              if (id != resetName) {
                  spliceCitys(resetName);
              }

              //update className
              updateClass();

              return cityArr;
          },
          resultArr = pushCitys();

      this.setState({
          stateName: resultArr
      });

      //btn click
      this.filterResult(state['cityObj'], state['citys'], 'citys');
      this.filterResult(state['cityObj'], state['authorityCitys'], 'authorityCitys');
  }

  /**
   * [filterResult 过滤结果数组]
   * @param  {[obj]} stateObj [结果映射对象]
   * @param  {[array]} resultArr [需要过滤的数组]
   * @param  {[string]} stateName [过滤后设置的state名称，目前有citys，authorityCitys]
   * @return {}     [null]
   */
  filterResult(stateObj, resultArr, stateName) {
      let {state} = this;

      for (let i = 0, len = resultArr.length; i < len; i++) {
          delete resultArr[i]['active'];
          if (stateObj[resultArr[i]['id']]) {
              resultArr[i]['active'] = true;
          }
      }

      let rsObj = {};
      rsObj[stateName] = resultArr;

      this.setState(rsObj);
  }

  btnClick(ev, item) {
      let {state} = this;
      this.setQueryArr(item, 'queryCitys', '001');
      /*this.filterResult(state['cityObj'], state['citys'], 'citys');
      this.filterResult(state['cityObj'], state['authorityCitys'], 'authorityCitys');*/
  }

  businessClick(ev, item) {
      this.setQueryArr(item, 'businesssQuerys', '101');
  }

  /**
   * [abc 城市按首字母筛选]
   * @param  {[dom-ev]} ev [don ev对下]
   * @param  {[object]} item [dom对象所带的属性，包括id，name]
   * @return {}     [null]
   */
  abc(ev, item) {
      let {id, name} = item,
      {state} = this,
      cityName = 'city-' + name

      if (!state[cityName]) {
          if (name == 'A') {
              this.state['city-' + name] = [{name:'澳大利亚', 'id':'003'}, {name:'a1', 'id':'08939'}];
          }

          if (name == 'B') {
              this.state['city-' + name] = [{name:'北京市', 'id':'053'}, {name:'拜拜', 'id':'23'}];
          }
      }

      this.filterResult(state['cityObj'], state[cityName], 'citys');
  }

  render() {
    const text = this.state.liked ? "liked" : "haven\"t liked";
    const listPadding = (stateName,fn) => {
        return this.state[stateName].map((item) =>
          <a key={item.id} className={(item.active? 'active': '')} onClick={(ev) => fn? this[fn](ev,item): ''}>
            {item.name}
          </a>
        );
    };
    const selectAll = () => {
        this.state['citys'].map((item) =>
          this.setQueryArr(item, 'queryCitys', '001')
        );
    }

    return (
        <div>
          <Modal
           title="筛选"
           wrapClassName="vertical-center-modal"
           visible={this.props.modalV}
           onOk={() => this.props.changeModalV(false)}
           onCancel={() => this.props.changeModalV(false)}
         >
             <div className="search-main">
                 <p>城市 <a onClick={selectAll}>全选</a><a>重置</a></p>
                 <p className="search-content-item-abc">{listPadding('abc', 'abc')}</p>
                 <p className="search-content-item-citys">
                     {listPadding('citys', 'btnClick')}
                 </p>
                 <p>权限城市</p>
                 <p className="search-content-item-power-citys">{listPadding('authorityCitys', 'btnClick')}</p>
                 <p className="search-content-item-count">共计<span className="search-content-count-num">{this.state.queryCitys.length}</span>条</p>
                 <p className="search-content-count-result search-content-count-result-active">{listPadding('queryCitys')}</p>
                 <p>业务线</p>
                 <p className="search-content-item-business">{listPadding('businesss', 'businessClick', 'businesssObj')}</p>
                 <p className="search-content-item-business search-content-count-result-active">{listPadding('businesssQuerys')}</p>
             </div>
         </Modal>
         <div onClick={this.handleClick}>
           You {text} this. Click to toggle.
         </div>
        </div>
    );
  }
}

export default Search;
