'use strict';

// Register `albumList` component, along with its associated controller and template
angular.module('galleryComponents')
    .component('albumDetail', {
        templateUrl: '/js/angular_app/+album-detail/album-detail.template.html',
        controller: ['$routeParams', 'Gallery',
            function AlbumDetailController($routeParams, Gallery) {
                var self = this;
                var innerCallback;

                Gallery.getDetail($routeParams.albumKey).then(function (response) {
                    var result = response.data.result;

                    self.photos = result.images;
                    self.editable = result.editable;
                    self.galleryKey = result.galleryKey;
                    self.galleryName = result.galleryName;
                    
                    innerCallback(result.galleryKey);

                    setTimeout(function(){
                        $("a.fancy-img").fancybox({
                            'transitionIn': 'elastic',
                            'transitionOut': 'elastic',
                            'speedIn': 600,
                            'speedOut': 200,
                            'overlayShow': false
                        });
                    }, 400);
                });

                this.delete = function (name) {
                    Gallery.deleteImage(name);
                };

                this.albumLoad = function (result) {
                    innerCallback = result;
                };

                this.$postLink = function () {
                    

                };

            }
        ]
    });
