var express = require('express');
var router = express.Router();
const Joi = require('@hapi/joi');
const httpInfo = require('../models/addhttp');
const querystring = require('querystring');

/* get请求数据格式 */
const schemaDevice = Joi.object({
    domain:Joi.string().required(),
    url:Joi.string().required(),
    title:Joi.string().required(),
    // referrer:Joi.string(),
    sh:Joi.string(),
    sw:Joi.string(),
    cd:Joi.string(),
    lang:Joi.string(),
})

/* GET http 响应时间等参数. */
router.get('/', function(req, res, next) {
    try {
        const reqData = querystring.parse(req.query.params?req.query.params:"");        
        let deviceInfo = {
            domain:reqData.domain,
            url:reqData.url,
            title:reqData.title,
            referrer:reqData.referrer,
            sh:reqData.sh,
            sw:reqData.sw,
            cd:reqData.cd,
            lang:reqData.lang,
        }
        // 检查数据格式是否满足要求
        const { error } = schemaDevice.validate(deviceInfo);
        console.log(error);
        if(error === undefined){
            console.log(12313131);
            // 写入设备信息
            httpInfo.create(deviceInfo).then(function (result) {
                // 写入 flash
                // req.flash('success', '新增新闻成功！')
                res.send({
                    code:0,
                    message:"新增访问用户成功"
                })
            }).catch(function (e) {
                // req.flash('error', '新增新闻失败！');
                return res.send(e.message);
                next(e);
            })
        }else{
            console.log(error.message);
            res.send(error.message);
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
    
});

module.exports = router;