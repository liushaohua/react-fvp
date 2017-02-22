'use strict';

const qs = require('qs');
const mockjs = require('mockjs');


module.exports = {
  'POST /api/home' (req, res) {
    setTimeout(function () {
      const editItem = qs.parse(req.body);

      res.json({
        success: true,
        data: {
            'a': 'jinqicheng',
            'b': 'zhangzhen'
        }
      });
    }, 500);
  },

  'POST /api/home/charts' (req, res) {
    setTimeout(function () {
      const dateItem = qs.parse(req.body);

      res.json({
        success: true,
        "code":1,
        "datas":[{
            "legend":["浏览量(PV)"],
            "data": [[120, 132, 101, 134, 90, 230, 210]],
            "xAxis": ['周一','周二','周三','周四','周五','周六','周日']
        }]
      });
    }, 500);
  }
};
