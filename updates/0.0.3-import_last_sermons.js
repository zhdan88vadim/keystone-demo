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

        Promise.all([p1, p2, p3]).then(function() {
            console.log('data is loaded');
            //console.log(postCategory, user, tag);

            importData();
        }, function(reason) {
            console.log('reason', reason);
        });
    }

    function getIdbyRef(array, refs) {
        var array_id = [];

        refs.forEach(function(element, index) {
            var findItem = lodash.find(array, { importRef: element });
            if (findItem) {
                array_id.push(findItem.id);
            }
        });

        return array_id.length == 1 ? array_id[0] : array_id;
    }

    function importData() {

        var importData = {
                "Post": [{
                    "name": "Воскресная проповедь - Скажи только слово - 26.02.2017",
                    "state": "published",
                    //"author": "oleg_kozlov",
                    //"author": "58b6783aed958650ac4786aa",
                    "author": getIdbyRef(user, ["oleg_kozlov"]),                    
                    "publishedDate": "2017-02-26 09:03:10",
                    "content.brief": "Воскресная проповедь - Скажи только слово - 26.02.2017",
                    "content.extended": "<p>Воскресная проповедь - Скажи только слово - 26.02.2017</p>",
                    "hits": 2,
                    "categories": getIdbyRef(postCategory, ["sermons"]),
                    //"tags": ['word', 'borba'],
                    //"tags": ['58b6783aed958650ac478698', '58b6783aed958650ac478691'],
                    "tags": getIdbyRef(tag, ['word', 'borba']),
                    "urlsPodfm": [],
                    "urls": [],
                    "image": {
                        "filename": "upload_word.jpg",
                        "size": 10500,
                        "mimetype": "image/jpeg"
                    },
                    file0: {
                        filename: '26.02.2017_Skazhi_tolko_slovo_OlegKozlov.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Воскресная проповедь - 19.02.17",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",                    
                    "author": getIdbyRef(user, ["pastor_andrey"]),
                    "publishedDate": "2017-02-19 09:03:10",
                    "content.brief": "Воскресная проповедь - 19.02.17",
                    "content.extended": "<p>Воскресная проповедь - 19.02.17</p>",
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
                        filename: '19.02.17_sermons.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Библейская школа — 6 — Церковь - 21.02.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-02-21 08:03:10",
                    "content.brief": "Библейская школа — 6 — Церковь - 21.02.2017",
                    "content.extended": "<p>Библейская школа — 6 — Церковь - 21.02.2017</p>",
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
                        filename: '2.21.2017-Bible_school-church-part%201-lesson%206.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }, {
                    "name": "Библейская школа — 5 — Молитва - 14.02.2017",
                    "state": "published",
                    //"author": "58b6783aed958650ac4786a8",
                    //"author": "pastor_andrey",
                    "author": getIdbyRef(user, ["adminuser"]),
                    "publishedDate": "2017-02-14 07:03:10",
                    "content.brief": "Библейская школа — 5 — Молитва - 14.02.2017",
                    "content.extended": "<p>Библейская школа — 5 — Молитва - 14.02.2017</p>",
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
                        filename: '14.02.17_molitva_school-5.mp3',
                        size: 10622,
                        mimetype: 'audio/mpeg'
                    }
                }]
            };

        keystone.createItems(importData, function (err, stats) {
            stats && console.log(stats.message);
            done(err);
        });
    }

    loadData();

};

