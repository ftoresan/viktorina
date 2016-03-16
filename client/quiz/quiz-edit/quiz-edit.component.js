angular.module('viktorina').directive('quizEdit', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/quiz/quiz-edit/quiz-edit.html',
		controllerAs: 'editQuiz',
		controller : function($scope, $reactive, $stateParams, $state) {
			$reactive(this).attach($scope);
			
			this.helpers({
				quiz: () => {
					return Quizzes.findOne({_id: $stateParams.id});
				}
			});
			this.save = () => {
				Quizzes.update({_id: this.quiz._id}, this.quiz);
				$state.go("manage");
			};
			this.newQuestion = () => {
				this.quiz.questions.push({title: "Question " + this.quiz.questions.length, type: 'Single'});
			};
			this.selectQuestion = (question) => {
				this.currentQuestion = question;
			}
		}
	}
});