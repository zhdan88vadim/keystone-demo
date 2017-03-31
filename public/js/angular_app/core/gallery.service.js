'use strict';

// Define the `core.phone` module
angular.module('core.gallery', ['ngResource']);


angular.module('core.gallery')
    .service('Gallery', ['$http', '$q',
        function ($http, $q) {

            var httpCallWrapper = function (callPromise, returnRawResponse, returnHeaders) {
                var deferred = $q.defer();

                function createErrorResult(status, data) {
                    var result = {};
                    result.status = status;
                    result.errorMessage = data;
                    result.errorDescription = null;
                    return result;
                }

                callPromise.then(function (data, status, headers, config) {

                    if (returnHeaders) {
                        deferred.resolve(headers());
                    }

                    if (data === '') {
                        deferred.resolve();
                    }

                    var response = data;

                    deferred.resolve(response);

                }, function (data, status, headers, config) {
                    deferred.reject(createErrorResult(status, data));
                });

                return deferred.promise;
            };



            this.getAll = function () {
                return httpCallWrapper($http.get('/api/gallery/' + '?admin=true'));
            }

            this.getDetail = function (albumKey) {
                return httpCallWrapper($http.get('/api/gallery/' + albumKey + '?admin=true'));
            }

            this.addAlbum = function (galleryName) {
                return httpCallWrapper($http.post('/api/gallery/' + '?admin=true', {name: galleryName}));
            }

            this.updateAlbum = function (data) {
                if (data.key || data.name) {
                    return httpCallWrapper($http.post('/api/gallery/update' + '?admin=true', data));
                }
            }

            this.deleteAlbum = function (key) {
                console.log('deleteAlbum', key);
            }

            this.deleteImage = function (name) {
                console.log('deleteImage', name);
            }
        }
    ]);