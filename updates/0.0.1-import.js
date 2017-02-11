var keystone = require('keystone');

module.exports = function (done) {

    var posts = [];


    var importData = {

        User: [{
            'name.full': 'admin@admin.com',
            email: 'admin@admin.com',
            password: 'admin',
            isAdmin: false,
            photo: {
                filename: 'user_admin.jpg',
                size: 10622,
                mimetype: 'image/jpeg'
            },
            __ref: 'adminuser'
        }, {
            'name.full': 'Пастор Андрей',
            email: 'pa@keystonejs.com',
            password: 'user',
            isAdmin: false,
            photo: {
                filename: 'user_pa.jpg',
                size: 10622,
                mimetype: 'image/jpeg'
            },
            __ref: 'pa'
        }, {
            'name.full': 'Евгений Шитов',
            email: 'esh@keystonejs.com',
            password: 'user',
            isAdmin: false,
            photo: {
                filename: 'user_esh.jpg',
                size: 10622,
                mimetype: 'image/jpeg'
            },
            __ref: 'esh'
        }, {
            'name.full': 'Олег Козлов',
            email: 'oko@keystonejs.com',
            password: 'user',
            isAdmin: false,
            photo: {
                filename: 'user_oko.jpg',
                size: 10622,
                mimetype: 'image/jpeg'
            },
            __ref: 'oko'
        }, {
            'name.full': 'Вадим Ждан - admin',
            email: 'vzh@keystonejs.com',
            password: '0p;/)P:?',
            isAdmin: true,
            photo: {
                filename: 'user_vzh.jpg',
                size: 10622,
                mimetype: 'image/jpeg'
            },
            __ref: 'vzh'
        }],

        PostCategory: [{
            name: 'sermons',
            __ref: 'sermons'
        }, {
            name: 'materials',
            __ref: 'materials'
        }, {
            name: 'testimonies',
            __ref: 'testimonies'
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
            name: 'Работа над собой',
            __ref: 'rabota_nad_soboi'
        }, {
            name: 'Призвание',
            __ref: 'prizvanie'
        }, {
            name: 'Борьба',
            __ref: 'borba'
        }, {
            name: 'Здоровье',
            __ref: 'zdorovie'
        }, {
            name: 'Упорство',
            __ref: 'uporstvo'
        }, {
            name: 'Любовь',
            __ref: 'lubovi'
        }, {
            name: 'Молитва',
            __ref: 'molitva'
        }],

        // db id

        Post: posts

    };








    var users = importData.User;

    for (var i = 0; i < 20; i++) {

        for (var userIndex = 0; userIndex < users.length - 1; userIndex++) {

            posts.push({
                name: 'Тестовый пост: ' + i,
                state: 'published',
                author: users[userIndex].__ref,
                publishedDate: '2016-04-12',
                'content.brief': 'Тестовый пост: ' + i + ' Тестовый пост: ' + i,
                'content.extended': 'Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i + ' Тестовый пост: ' + i,
                categories: 'sermons',
                tags: ['rabota', 'sluzhenie']
            });
        }

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
        tags: ['rabota']
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
        tags: ['rabota', 'sluzhenie', 'semya']
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
        name: 'Материал — Воля Божья в Библии - 6',
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


    posts.push({
        name: 'Материал — Воля Божья в Библии - 7',
        state: 'published',
        author: 'oko',
        publishedDate: '2011-03-12',
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
        name: 'Свидетельство — Воля Божья в Библии - 2',
        state: 'published',
        author: 'oko',
        publishedDate: '2012-01-12',
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
        categories: 'testimonies',
        tags: ['semya']
    });


    posts.push({
        name: 'Свидетельство — Воля Божья в Библии - 4',
        state: 'published',
        author: 'oko',
        publishedDate: '2012-02-12',
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
        categories: 'testimonies',
        tags: ['semya']
    });


    keystone.createItems({}, function (err, stats) {
        stats && console.log(stats.message);
        done(err);
    });

};

