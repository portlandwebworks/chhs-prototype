'use strict';

angular.module('chhs').directive('caseWorkerMessenger', function (messagesFactory, Account) {
  return {
    restrict: 'C',
    templateUrl: 'app/directives/case-worker-messenger/index.jsp',
    scope: {},
    controller: function ($scope) {
      var account;

      $scope.messages = [];
      $scope.userMessage = null;
      $scope.viewedMessage = null;
      $scope.repliedMessage = null;

      function loadMessages() {
        messagesFactory.getMessages().then(function (messages) {
          $scope.messages = messages;
        });
      }

      function hideComposeWindow(){
        // Because data-dismiss overrides handlers and prevents Angular clicks.
        $('#case-worker-messenger__composer').modal('hide');
      }

      $scope.sendMessage = function () {
        messagesFactory.sendMessage($scope.userMessage).then(function () {
          hideComposeWindow();
          $scope.userMessage = null;
          $scope.caseWorkerMessageForm.$setPristine();
          loadMessages();
        });
      };

      $scope.composeMessage = function(){
        $scope.userMessage = messagesFactory.createMessage();
      };

      $scope.replyToMessage = function (message) {
        $scope.userMessage = messagesFactory.createMessage();
        $scope.userMessage.inReplyToId = message.id;
        $scope.userMessage.toEmail = message.fromEmail;
        $scope.userMessage.subject = 'RE: ' + message.subject;
      };

      $scope.deleteMessage = function (id) {
        messagesFactory.deleteMessage(id).then(function(){
          $scope.viewedMessage = null;
          loadMessages();
        });
      };

      $scope.cancelCompose = function () {
        $scope.userMessage = null;
        hideComposeWindow();
      };

      $scope.viewMessage = function(message){
        $scope.viewedMessage = message;
      };

      Account.getUserAccount().then(function (currentAccount) {
        account = currentAccount;
      });

      Account.getCaseWorker().then(function (caseWorker) {
        $scope.caseWorker = caseWorker;
      });

      loadMessages();
    }
  };
});
