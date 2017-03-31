'use strict';

// angular.module('core').controller('NewAlbumController', ['Gallery', function ($galleryService) {
//     this.linkText = 'Add new album';

// }]);


angular.module('core').directive('addAlbum', ['Gallery', function ($galleryService) {
    return {
        restrict: 'A',
        require: '^albumList',
        scope: {
        },
        //controller: 'NewAlbumController',
        controller: function () {
            this.linkText = 'Add new album funct';
            this.add = function () {
                var galleryName = prompt("Введите название галерии");
                if (!galleryName) return;

                    // for old approach
                    //albumListCtrl.add(galleryName);

                    this.parenMethodAddGallery(galleryName);
                }

        },
        controllerAs: '$ctrl',
        template: `
            <div ng-click="$ctrl.add()" class="polaroid-new-gallery">
                <img src="/../assets/img/upload_add.png"/>
                <div>Добавить галерею</div>
            </div>
        `,
        link: function (scope, element, attrs, albumListCtrl) {
            var a = $galleryService;

            // ----------------------

            // https://www.bennadel.com/blog/2969-passing-ngmodelcontroller-into-a-component-directive-controller-in-angularjs.htm
           
            scope.$ctrl.parenMethodAddGallery = albumListCtrl.add;

            // ----------------------

            // old approach
            // scope.add = function () {
            //     albumListCtrl.add('album name');
            // }
        }
    };
}]);