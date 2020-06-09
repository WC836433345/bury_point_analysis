const deviceInfo = require('../mongodb/mongo').deviceInfo

module.exports = {
    // 新增http请求信息
    create: function create (httpInfo) {
        console.log(httpInfo);
        return deviceInfo.create(httpInfo).exec();
    }
}
