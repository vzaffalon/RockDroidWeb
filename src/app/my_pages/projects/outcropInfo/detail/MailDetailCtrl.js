/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('RockDroid.pages.projects')
    .controller('MailDetailCtrl', MailDetailCtrl);

  /** @ngInject */
  function MailDetailCtrl($stateParams, mailMessages) {
    var vm = this;
    vm.mail = mailMessages.getMessageById($stateParams.id);
    vm.label = $stateParams.label;
  }

})();
