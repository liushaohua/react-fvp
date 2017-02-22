import {update, renChart} from '../services/home';
import { parse } from 'qs';

export default {

  namespace: 'home',

  state: {
    data: [],
    list: [],
    chartsLoading: true,
    tLoading: false,
    total: null,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalV: false,  //model 弹窗
    date: '2015-06-06',
    abc:'d',
    option: {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            }
        ]
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({ type: 'resetState' });
          dispatch({
            type: 'update',
            payload: 'abc',
          });
        }
      });
    },
  },

  effects: {
    *update({ payload }, { select, call, put }) {
      //yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });

      const id = yield select(({ home }) => home.abc);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);

      if (data && data.success) {
        return;
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },

    *changeChats({ payload }, { select, call, put }) {
        const id = yield select(({ home }) => home.abc);
        const newUser = { ...payload, id };
        const { data } = yield call(renChart, newUser);
        //renChart 要导入
        if (data && data.success) {
            let option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : []
            };
            let datas = data.datas[0];
            datas.data.forEach((item, i) => {
                option.series.push({
                    name: datas.legend[i],
                    type:'line',
                    areaStyle: {normal: {}},
                    data: datas.data[i]
                });
            });
            option.legend.data = datas.legend;
            option.xAxis.data = datas.xAxis;
            console.log('renchart-',JSON.stringify(option));

            yield put({
              type: 'chartSuccess',
              payload: option
            });
        }
    }
  },


  //effects 发请求后触发reducers

  reducers: {
    showLoading(state) {
      return { ...state, loading: true};
    },
    resetState(state) {
      return { ...state,modalV: false };
    },
    createSuccess(state, action) {
      const newUser = action.payload;
      return { ...state, list: [newUser, ...state.list], loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(user => user.id !== id);
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      console.log('home.js/70');
      const updateUser = action.payload;
      console.log(updateUser,'dcd');
      return { ...state};

      //注释------------------

      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },
    querySuccess(state, action) {
        return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
        return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
        return { ...state, modalVisible: false };
    },

    changeLoading(state, action) {
        return { ...state, tLoading: action.payload.tLoading};
    },

    modalV(state, action) {
        console.log({ ...state, modalV: action.payload.modalV});
        //antd 组建渲染必须通过state才行
        return { ...state, modalV: action.payload.modalV};
    },

    changeChatsSucc(state, action) {
        return { ...state, date: action.payload.date};
    },

    chartReady(state) {
        return { ...state, chartsLoading: false};
    },

    chartSuccess(state, action) {
        console.log('22aaa',action.payload);
        return { ...state, option: action.payload};
    }
  },

};
