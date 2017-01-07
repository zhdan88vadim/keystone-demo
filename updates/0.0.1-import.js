var keystone = require('keystone');

module.exports = function (done) {

    var posts = [];

    for (var i = 0; i < 40; i++) {

        posts.push({
            name: 'Тестовый пост: ' + i,
            state: 'published',
            author: 'pa',
            publishedDate: '2016-04-12',
            'content.brief': 'Тестовый пост: ' + i + ' Тестовый пост: ' + i,
            'content.extended': 'Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i,
            categories: 'sermons',
            tags: ['rabota', 'sluzhenie']
        });
    }

    posts.push({
        name: 'Воскресная проповедь — Воля Божья в Библии - часть 1 - 09.10.2016',
        state: 'published',
        author: 'vzh',
        publishedDate: '2016-04-12',
        'content.brief': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',

        'content.extended': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',
        categories: 'sermons',
        tags: ['rabota', 'sluzhenie', 'dengi', 'semya']
    });

    posts.push({
        name: 'Воскресная проповедь — Воля Божья в Библии - часть 2 - 09.10.2016',
        state: 'published',
        author: 'vzh',
        publishedDate: '2016-03-12',
        'content.brief': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',

        'content.extended': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',
        categories: 'sermons',
        tags: ['rabota', 'sluzhenie', 'dengi', 'semya']
    });


    posts.push({
        name: 'Материал — Воля Божья в Библии',
        state: 'published',
        author: 'vzh',
        publishedDate: '2016-03-12',
        'content.brief': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',

        'content.extended': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',
        categories: 'materials',
        tags: ['rabota', 'sluzhenie', 'dengi', 'semya']
    });

    posts.push({
        name: 'Материал — Воля Божья в Библии - 4',
        state: 'published',
        author: 'oko',
        publishedDate: '2016-03-12',
        'content.brief': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',

        'content.extended': 'Ducimus, repudiandae impedit sapiente ex numquam expedita ' +
        'alias doloribus in expedita alias doloribus in incidunt sequi dignissimos odit ' +
        'facilis maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus ' +
        'in incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci... expedita alias doloribus in incidunt sequi dignissimos odit facilis ' +
        'maxime aperiam aspernatur soluta nulla adipisci... expedita alias doloribus in ' +
        'incidunt sequi dignissimos odit facilis maxime aperiam aspernatur soluta nulla ' +
        'adipisci...',
        categories: 'materials',
        tags: ['rabota', 'sluzhenie', 'dengi', 'semya']
    });


    keystone.createItems({

        User: [{
            'name.full': 'admin@admin.com',
            email: 'admin@admin.com',
            password: 'admin',
            // in db = $2a$10$jVCr4RYPdSJIUXGRzvP2S.y18.c.X7QannVjEUWXt9zBfX6qZUQju
            isAdmin: false,
            __ref: 'adminuser'
        }, {
            'name.full': 'Пастор Андрей',
            email: 'pa@keystonejs.com',
            password: 'user',
            isAdmin: false,
            __ref: 'pa'
        }, {
            'name.full': 'Евгений Шитов',
            email: 'esh@keystonejs.com',
            password: 'user',
            isAdmin: false,
            __ref: 'esh'
        }, {
            'name.full': 'Олег Козлов',
            email: 'oko@keystonejs.com',
            password: 'user',
            isAdmin: false,
            __ref: 'oko'
        }, {
            'name.full': 'Вадим Ждан - admin',
            email: 'vzh@keystonejs.com',
            password: '$2a$10$jVCr4RYPdSJIUXGRzvP2S.y18.c.X7QannVjEUWXt9zBfX6qZUQju',
            isAdmin: true,
            __ref: 'vzh'
        }],

        PostCategory: [{
            name: 'sermons',
            __ref: 'sermons'
        }, {
            name: 'materials',
            __ref: 'materials'
        }],

        Tag: [{
            name: 'Исцеление',
            __ref: 'iscelenie'
        }, {
            name: 'Работа',
            __ref: 'rabota'
        }, {
            name: 'Деньги',
            __ref: 'dengi'
        }, {
            name: 'Семья',
            __ref: 'semya'
        }, {
            name: 'Служение',
            __ref: 'sluzhenie'
        }, {
            name: 'Работа',
            __ref: 'rabota'
        }, {
            name: 'Призвание',
            __ref: 'prizvanie'
        }],

        // db id

        Post: posts

    }, function (err, stats) {
        stats && console.log(stats.message);
        done(err);
    });

};

