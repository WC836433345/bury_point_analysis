/*
说明：
为什么我们要加入use strict,它的作用是“标记严格模式”，它的好处是：
其一：如果在语法检测时发现语法问题，则整个代码块失效，并导致一个语法异常。
其二：如果在运行期出现了违反严格模式的代码，则抛出执行异常。
*/
'use strict';

module.exports = {
    port: 3000,
    url:'mongodb://127.0.0.1:27017/',
    session: {
        name: 'SHOP',
        secret: 'SHOP',
        maxAge: 2592000000,
        cookie: {
            httpOnly: true,
            secure:   false,
            maxAge:   365 * 24 * 60 * 60 * 1000,
        }
    }
};
