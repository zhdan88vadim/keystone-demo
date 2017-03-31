'use strict';

angular.module('galleryComponents')
    .component('fileUpload', {
        require: {
            parent: '^albumDetail'
        },
        bindings: {
            // <file-upload url-upload="{{'/api/gallery/file-upload/' + $ctrl.galleryKey}}"></file-upload>
            // urlUpload: '@'

            apiUrlUpload: '@',
            onAlbumLoad: '&'
        },
        template: '<form class="dropzone"></form>',
        controller: ['$element', '$timeout', 'Gallery',
            function FileUploadController(element, $timeout, Gallery) {
                var self = this;
                try { Dropzone }
                catch (error) {
                    throw new Error('Dropzone.js not loaded.');
                }

                this.$postLink = function () {
                    
                    
                    // callback function
                    // You are not passing the arguments correctly. In & bindings, you have to pass an object specifying values for the various arguments. E.g.
                    // https://github.com/angular/angular.js/issues/11995

                    this.onAlbumLoad({result: function(albumKey) {
                        console.log('full api url upload: ', self.apiUrlUpload + albumKey);

                        $(element).find('form').dropzone({
                            url: self.apiUrlUpload + albumKey,
                            maxFilesize: 2,
                            parallelUploads: 10
                        });
                    }});
                };
            }
        ]
    });
