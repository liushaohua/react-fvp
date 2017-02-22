import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './HomePage.less';
import {SimpleChartComponent, echarts} from '../components/MainLayout/SimpleChartComponent.jsx';
import TimeBar from '../components/MainLayout/TimeBar.jsx';
import HomeLoading from '../components/home/home.jsx';
import HomeHeader from '../components/home/header.jsx';
import TableList from '../components/MainLayout/TableList.jsx';
import { Layout, Breadcrumb,  Menu, Icon  } from 'antd';
const SubMenu = Menu.SubMenu;
const { Header, Footer, Sider, Content } = Layout;

function HomePage({ location, dispatch, home }) {
    //1、从models 中获取state
    const {tLoading, option, chartsLoading, date, modalV} = home;

    //2、定义homeProps,chartsProps
    const homeProps = {
        tLoading,
        onChangeLoading(value) {
          dispatch({
            type: 'home/changeLoading',
            payload: {
                tLoading: value
            }
          });
        },
        handleClick() {
            alert('handleClick');
        }
    };

    const timebarProps = {
        date,
        modalV,
        changeModalV(v) {
            dispatch({
              type: 'home/modalV',
              payload: {
                  modalV: v
              }
            });
        },
        onChange(date, dateString) {
            //手动clear
            echarts.getInstanceByDom(document.getElementById('echarts_id1')).clear();
            dispatch({
              type: 'home/changeChats',
              payload: {
                  date: dateString? dateString: date.target.value
              }
            });
        }
    };

    const chartsProps = {
        refChart: 'echarts_id1',
        chartsLoading,
        option,
        onChartReady(chart) {
            setTimeout(function() {
                dispatch({
                  type: 'home/chartReady'
                });
            }, 3000);
            //setTimeout(() => this.renderChartData(),2000);
            //chart.hideLoading();
        }
    };

    //3、padding Props
    // tLoading={tLoading}

    return (
        <div className="homeWrap">
            <Layout>
                <Sider>
                    <Menu mode="inline" theme="dark"
                        style={{ width: 240 }}
                      >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>趋势分析</span></span>}>
                          <Menu.Item key="1">网站趋势</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>页面分析</span></span>}>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>平台管理</span></span>}>
                          <Menu.Item key="9">Option 9</Menu.Item>
                        </SubMenu>
                      </Menu>
                </Sider>
                <Content>
                    <Header>
                        <HomeHeader styles={styles}/>
                    </Header>
                    <Content>
                        <div className={styles.content}>
                            <Breadcrumb separator=">">
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                            <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                            <Breadcrumb.Item>An Application</Breadcrumb.Item>
                            </Breadcrumb>
                            <ul className={styles.list}>
                                <li>You can go to <Link to="/users">/users</Link></li>
                            </ul>
                            <TimeBar {...timebarProps}/>
                            <SimpleChartComponent {...chartsProps}/>
                            <HomeLoading {...homeProps}/>
                            <TableList/>
                        </div>
                    </Content>
                    <Footer>Footer</Footer>
                </Content>
            </Layout>
        </div>
    );
}

HomePage.propTypes = {
    home: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(HomePage);
