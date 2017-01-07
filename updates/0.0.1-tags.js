var keystone = require('keystone');
var Tag = keystone.list('Tag');

module.exports = function (done) {
    done();

    // new Tag.model({ name: 'Исцеление'}).save(function() {
    //     new Tag.model({ name: 'Работа'}).save(function() {
    //         new Tag.model({ name: 'Деньги'}).save(function() {
    //             new Tag.model({ name: 'Семья'}).save(function() {
    //                 new Tag.model({ name: 'Служение'}).save(function() {
    //                     new Tag.model({ name: 'Призвание'}).save(function() {
    //                         done();
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
};
