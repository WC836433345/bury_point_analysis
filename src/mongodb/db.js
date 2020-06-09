/**
 * mongoDB数据库配置
 * Created by admin on 2017/8/31 0031.
 */
'use strict';

import mongoose from 'mongoose';
import config from 'config-lite'; //获取基本信息
// import log from '../util/log4jsUtil'; //自定义日志文件，后面我们将会说明

mongoose.connect(config.url,{server:{auto_reconnect: true}});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.once('open',() => {
    console.log('======mongooDB数据库连接成功======');
    // log.info('mongooDB数据库连接成功.端口号：' + config.port); //自定义日志存储
});

db.on('error',function (error) {
    console.error('mongooDB数据库连接错误：' + error);
    // log.debug('mongooDB数据库连接成功.' + error); //自定义日志存储
    mongoose.disconnect();
});

db.on('close',function () {
    console.log('mongooDB数据库断开，请重新连接.');
    // log.trace('mongooDB数据库断开，请重新连接.');
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;