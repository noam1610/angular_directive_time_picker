'use strict';
/*eslint consistent-this:[2,  "ngTimeCtrl"] */
var directivename = 'ngTime';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var ngTimeCtrl = this;
        ngTimeCtrl.directivename = directivename;

        // console.log(ngTimeCtrl.magasin);
        // console.log(ngTimeCtrl.hour);
        // console.log(ngTimeCtrl.minute);

        ngTimeCtrl.changeHour = function(signe) {
            ngTimeCtrl.hourNow = (new Date()).getHours();
            ngTimeCtrl.minuteNow = (new Date()).getMinutes();
            var minuteFermeture = (ngTimeCtrl.magasin.heureFermeture % 1) * 60;

            if (signe == '+' && ngTimeCtrl.hour < Math.floor(ngTimeCtrl.magasin.heureFermeture)) {
                ngTimeCtrl.hour++;
            };

            if (signe == '+' && ngTimeCtrl.hour == Math.floor(ngTimeCtrl.magasin.heureFermeture) && ngTimeCtrl.minute > minuteFermeture) {
                ngTimeCtrl.minute = 0;
            };

            if (signe == '-' && ngTimeCtrl.hour == (ngTimeCtrl.hourNow + 1) && ngTimeCtrl.minuteNow > ngTimeCtrl.minute) {
                ngTimeCtrl.hour--;
                ngTimeCtrl.minute = ngTimeCtrl.minuteNow;
            };
            if (signe == '-' && ngTimeCtrl.hour > (ngTimeCtrl.hourNow + 1)) {
                ngTimeCtrl.hour--;
            };
        };

        ngTimeCtrl.changeMinute = function(signe) {
            ngTimeCtrl.minuteNow = (new Date()).getMinutes();
            var minuteFermeture = (ngTimeCtrl.magasin.heureFermeture % 1) * 60;

            if (signe == '+' && ngTimeCtrl.hour < Math.floor(ngTimeCtrl.magasin.heureFermeture) && ngTimeCtrl.minute < 59) {
                ngTimeCtrl.minute++;
            };
            if (signe == '+' && ngTimeCtrl.hour == Math.floor(ngTimeCtrl.magasin.heureFermeture) && ngTimeCtrl.minute < minuteFermeture) {
                ngTimeCtrl.minute++;
            }

            if (signe == '-' && ngTimeCtrl.hour > ngTimeCtrl.hourNow && ngTimeCtrl.minute > 0) {
                ngTimeCtrl.minute--;
            };

            if (signe == '-' && ngTimeCtrl.hour == ngTimeCtrl.hourNow && ngTimeCtrl.minute > ngTimeCtrl.minuteNow) {
                ngTimeCtrl.minute--;
            };

        };

    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: {
                magasin: '=',
                hour: '=',
                minute: '='
                    // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: controller,
            controllerAs: 'ngTimeCtrl',
            bindToController: true,
            template: require('./ngTime.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
