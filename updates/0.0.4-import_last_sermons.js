var keystone = require('keystone');
var lodash = require('lodash');
var PostCategory = keystone.list('PostCategory');
var User = keystone.list('User');
var Tag = keystone.list('Tag');

module.exports = function (done) {

    var postCategory;
    var user;
    var tag;


    function loadData() {

        var p1 = new Promise(function (resolve, reject) {
            PostCategory.model.find({}).exec(function (err, result) {
                if (err) reject(err);

                postCategory = result;
                resolve();
            });
        });

        var p2 = new Promise(function (resolve, reject) {
            User.model.find({}).exec(function (err, result) {
                if (err) reject(err);

                user = result;
                resolve();
            });
        });

        var p3 = new Promise(function (resolve, reject) {
            Tag.model.find({}).exec(function (err, result) {
                if (err) reject(err);

                tag = result;
                resolve();
            });
        });

        Promise.all([p1, p2, p3]).then(function () {
            console.log('data is loaded');
            //console.log(postCategory, user, tag);

            importData();
        }, function (reason) {
            console.log('reason', reason);
        });
    }

    function getIdbyRef(array, refs) {
        var array_id = [];

        refs.forEach(function (element, index) {
            var findItem = lodash.find(array, {importRef: element});
            if (findItem) {
                array_id.push(findItem.id);
            }
        });

        return array_id.length == 1 ? array_id[0] : array_id;
    }

    function importData() {

        var importData = {
            "Post": [
                {
                    "name": "Воскресная проповедь - 16.04.17",
                    "state": "published",
                    //"author": "oleg_kozlov",
                    //"author": "58b6783aed958650ac4786aa",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-04-16 09:03:10",
                    "content.brief": "Воскресная проповедь - 16.04.17",
                    "content.extended": "<p>Воскресная проповедь - 16.04.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    //"tags": ['word', 'borba'],
                    //"tags": ['58b6783aed958650ac478698', '58b6783aed958650ac478691'],
                    "tags": [],
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_word.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '16.04.17_sermon.mp3',
                        size: 10622,
                        mimetype: ''
                    },
                    file1: {
                        filename: '16.04.17_koncert.mp3',
                        size: 10622,
                        mimetype: ''
                    }
                }, {
                    "name": "Библейская школа — 14 — Духовный рост - 18.04.17",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-04-18 07:03:10",
                    "content.brief": "Библейская школа — 14 — Духовный рост - 18.04.17",
                    "content.extended": "<p>Библейская школа — 14 — Духовный рост - 18.04.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '18.04.17._bible_school_duhovny_rost.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Библейская школа — 13 — Служение - 11.04.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-04-11 07:03:10",
                    "content.brief": "Библейская школа — 13 — Служение - 11.04.2017",
                    "content.extended": "<p>Библейская школа — 13 — Служение - 11.04.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: 'bible_school_sluzhenie_11.04.2017.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Воскресная проповедь - 09.04.17",
                    "state": "published",
                    //"author": "oleg_kozlov",
                    //"author": "58b6783aed958650ac4786aa",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-04-09 09:03:10",
                    "content.brief": "Воскресная проповедь - 09.04.17",
                    "content.extended": "<p>Воскресная проповедь - 09.04.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    //"tags": ['word', 'borba'],
                    //"tags": ['58b6783aed958650ac478698', '58b6783aed958650ac478691'],
                    "tags": "",
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_word.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '09.04.17_sermon.mp3',
                        size: 10622,
                        mimetype: ''
                    }
                }, {
                    "name": "Библейская школа — 12 — Преуспевание - 04.04.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-04-04 07:03:10",
                    "content.brief": "Библейская школа — 12 — Преуспевание - 04.04.2017",
                    "content.extended": "<p>Библейская школа — 12 — Преуспевание - 04.04.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: 'bible_school_preuspevanie_part2__4apr_2017_1.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                },
                {
                    "name": "Воскресная проповедь - 02.04.17",
                    "state": "published",
                    //"author": "oleg_kozlov",
                    //"author": "58b6783aed958650ac4786aa",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-04-02 09:03:10",
                    "content.brief": "Воскресная проповедь - 02.04.17",
                    "content.extended": "<p>Воскресная проповедь - 02.04.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    //"tags": ['word', 'borba'],
                    //"tags": ['58b6783aed958650ac478698', '58b6783aed958650ac478691'],
                    "tags": "",
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_word.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '02.04.17_sermon.mp3',
                        size: 10622,
                        mimetype: ''
                    }
                }, {
                    "name": "Воскресная проповедь - 26.03.17",
                    "state": "published",
                    //"author": "oleg_kozlov",
                    //"author": "58b6783aed958650ac4786aa",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-26 09:03:10",
                    "content.brief": "Воскресная проповедь - 26.03.17",
                    "content.extended": "<p>Воскресная проповедь - 26.03.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    //"tags": ['word', 'borba'],
                    //"tags": ['58b6783aed958650ac478698', '58b6783aed958650ac478691'],
                    "tags": "",
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_word.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '26.03.17_propoved.mp3',
                        size: 10622,
                        mimetype: ''
                    }
                }, {
                    "name": "Библейская школа — 11 — Преуспевание - 28.03.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-28 07:03:10",
                    "content.brief": "Библейская школа — 11 — Преуспевание - 28.03.2017",
                    "content.extended": "<p>Библейская школа — 11 — Преуспевание - 28.03.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: 'bible_school_preuspevanie_28march19.10.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Воскресная проповедь - 19.03.2017",
                    "state": "published",
                    //"author": "oleg_kozlov",
                    //"author": "58b6783aed958650ac4786aa",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-19 09:03:10",
                    "content.brief": "Воскресная проповедь - 19.03.2017",
                    "content.extended": "<p>Воскресная проповедь - 19.03.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    //"tags": ['word', 'borba'],
                    //"tags": ['58b6783aed958650ac478698', '58b6783aed958650ac478691'],
                    "tags": "",
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_word.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: 'Propoved_19.03.2017.mp3',
                        size: 10622,
                        mimetype: ''
                    }
                }, {
                    "name": "Библейская школа — 10 — Дары и плоды духа - 21.03.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-21 07:03:10",
                    "content.brief": "Библейская школа — 10 — Дары и плоды духа - 21.03.2017",
                    "content.extended": "<p>Библейская школа — 10 — Дары и плоды духа - 21.03.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '21.03.17 dary i plody dukha.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Воскресная проповедь - 12.03.17",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["pastor_andrey"]),
                    "publishedDate": "2017-03-12 09:03:10",
                    "content.brief": "Воскресная проповедь - 12.03.17",
                    "content.extended": "<p>Воскресная проповедь - 12.03.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": [],
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_kolos.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '12.03.17 проповедь.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Библейская школа — 9 — Страх Божий - 14.03.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-14 07:03:10",
                    "content.brief": "Библейская школа — 9 — Страх Божий - 14.03.2017",
                    "content.extended": "<p>Библейская школа — 9 — Страх Божий - 14.03.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: 'Библейская школа - страх божий.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Воскресная проповедь - 05.03.17",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-05 08:03:10",
                    "content.brief": "Воскресная проповедь - 05.03.17",
                    "content.extended": "<p>Воскресная проповедь - 05.03.17</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": "",
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_kolos.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '05.03.17 проповедь.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Библейская школа — 8 — великое поручение Христа - 07.03.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-03-07 07:03:10",
                    "content.brief": "Библейская школа — 8 — великое поручение Христа - 07.03.2017",
                    "content.extended": "<p>Библейская школа — 8 — великое поручение Христа - 07.03.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    "tags": getIdbyRef(tag, ['bible_school']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_bible_school.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: 'Библейская школа - великое поручение Христа.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }]
        };

        //done();


        keystone.createItems(importData, function (err, stats) {
            stats && console.log(stats.message);
            done(err);
        });
    }

    loadData();

};

