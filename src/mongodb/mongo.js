const config = require('config-lite'); // 获取配置文件
const Mongolass = require('mongolass');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
      results.forEach(function (item) {
        item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
      })
      return results
    },
    afterFindOne: function (result) {
      if (result) {
        result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
      }
      return result
    }
})


// 创建counters 集合
exports.Counters = mongolass.model('Counters', {
    name:{ type: 'string', required: true },
    sequence_value: { type: 'number', required: true },
})

// exports.Counters.index({ name: 1 }, { unique: true }).exec();


exports.User = mongolass.model('User', {
    userNO: { type: 'string', required: true },
    password: { type: 'string', required: true },
})
exports.User.index({ userNO: 1 }, { unique: true }).exec() // 根据用户名找到用户，用户名全局唯一

exports.Post = mongolass.model('Post', {
	author: { type: Mongolass.Types.ObjectId, required: true },
	title: { type: 'string', required: true },
	content: { type: 'string', required: true },
	pv: { type: 'number', default: 0 }
})

exports.Post.index({ author: 1, _id: -1 }).exec()// 按创建时间降序查看用户的文章列表

exports.Comment = mongolass.model('Comment', {
	author: { type: Mongolass.Types.ObjectId, required: true },
	content: { type: 'string', required: true },
	postId: { type: Mongolass.Types.ObjectId, required: true }
})

exports.Comment.index({ postId: 1, _id: 1 }).exec()// 通过文章 id 获取该文章下所有留言，按留言创建时间升序


/*
新增文章
*/
exports.News = mongolass.model('http', {
    userId: { type: 'number', required: true },
    title:{type: 'string', required: true},
    content: { type: 'string', required: true },
    newId: { type: "number", required: false }
})
exports.News.index({ newId: 1, _id: 1 }).exec()// 通过文章 id 创建时间升序


/*
创建商品
*/
exports.products = mongolass.model('products',{
    domain:{type: 'number', required: true},
	url:{ type: 'string', required: true },
	title:{ type: 'string', required: true },
	referrer:{type: 'number', required: true},
	sh:{type: 'number', required: true},
	sw:{type: 'number', required: true},
	cd:{ type: "string", required: false },
	lang:{ type: "string", required: false },
})

/* 设备信息 */
exports.deviceInfo = mongolass.model('device_info',{
	domain:{type: 'string', required: true},
	url:{ type: 'string', required: true },
	title:{ type: 'string', required: true },
	referrer:{type: 'string'},
	sh:{type: 'string'},
	sw:{type: 'string'},
	cd:{ type: "string"},
	lang:{ type: "string"},
})

