var keystone = require('keystone');

module.exports = function (done) {

    var posts = [];


    for (var i = 0; i < 500; i++) {

        posts.push({
            name: 'Тестовый пост: ' + i,
            state: 'published',
            author: '5838818fdb3115222056a766',
            publishedDate: '2016-04-12',
            'content.brief': 'Тестовый пост: ' + i + ' Тестовый пост: ' + i,
            'content.extended': 'Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i,
            categories: '58205f5e90a8c418100d2344',
            tags: '5826f55765ed5f1ea0b18965'
        });

    }


    keystone.createItems({

        // User: [{
        //     'name.full': 'Пастор Андрей',
        //     email: 'pa@keystonejs.com',
        //     password: 'user',
        //     isAdmin: false,
        //     __ref: 'pa'
        // }, {
        //     'name.full': 'Евгений Шитов',
        //     email: 'esh@keystonejs.com',
        //     password: 'user',
        //     isAdmin: false,
        //     __ref: 'esh'
        // }, {
        //     'name.full': 'Олег Козлов',
        //     email: 'oko@keystonejs.com',
        //     password: 'user',
        //     isAdmin: false,
        //     __ref: 'oko'
        // }, {
        //     'name.full': 'Вадим Ждан - admin',
        //     email: 'vzh@keystonejs.com',
        //     password: '$2a$10$jVCr4RYPdSJIUXGRzvP2S.y18.c.X7QannVjEUWXt9zBfX6qZUQju',
        //     isAdmin: true,
        //     __ref: 'vzh'
        // }],
        //
        // PostCategory: [{
        //     name: 'Keystone JS',
        //     __ref: 'keystone'
        // }, {
        //     name: 'Node.js',
        //     __ref: 'node'
        // }],

        // db id

        Post: posts

    }, function (err, stats) {
        stats && console.log(stats.message);
        done(err);
    });

};

