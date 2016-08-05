'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope'];

    function controller($scope) {
        var vm = this;
        vm.controllername = fullname;

        vm.initiate = function() {
            vm.hour = (new Date()).getHours();
            vm.minute = (new Date()).getMinutes();
        }();

        vm.magasin = {
            heurOuverture: 9,
            heureFermeture: 20.5
        };

    };

    controller.$inject = deps;
    app.controller(fullname, controller);
};
