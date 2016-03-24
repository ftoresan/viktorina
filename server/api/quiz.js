angular.module('viktorina', ['angular-meteor'])
.service('Quiz', function () {
  
  this.evaluateQuestion = function (quizId, questionId, selectedOptions) {
    var quiz = Quizzes.findOne({ _id: quizId }, { fields : {
      correct: 0, questions: {
        $elemMatch: {
          id: questionId
        }
      }}});
    if (!quiz) {
      // error
    } else {
      /*var wrong = selectedOptions.diff(question.options);
      console.log(wrong);
      
      return wrong;*/
      
      var question = quiz.questions[0];
      if (question.type == Type.Single) {
        return [ { 
          option: question.options.find(function(element) {  
            return element.id == question.correct;
          }), 
          result: selectedOptions.length == 1 && selectedOptions[0] == question.correct
        }]
      } else {
        var result = [];          
      }
      return result;
    }
  };
})
.config(function (ServerAPIProvider) {
  ServerAPIProvider.register('Quiz');
});
 
/*angular.module('viktorina', []).config(function(ServerAPIProvider) {
  ServerAPIProvider.register('Quiz');
});*/