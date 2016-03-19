angular.module('viktorina').directive('quizView', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/quiz/quiz-view/quiz-view.html',
		controllerAs: 'viewQuiz',
		controller : function($scope, $reactive, $state, $stateParams, Quiz) {
			$reactive(this).attach($scope);
			
			this.helpers({
				quiz: () => {
					return Quizzes.findOne({_id: $stateParams.id});
				}
			});
			
			this.evaluate = () => {
				var question = this.quiz.questions[0];
				Quiz.evaluateQuestion(this.quiz._id, question.id, [question.options[0].id]).then(function(data) {
					console.log(data);
				});  
			}
		}
	}
});