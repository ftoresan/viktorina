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
			
			this.answer = () => {
				this.answeredQuestions = 1;
				this.currentIndex = 0;
				this.currentQuestion = this.quiz.questions[this.currentIndex];
				this.progress = (this.answeredQuestions / this.quiz.questions.length) * 100;
			};
			this.next = () => {
				if (this.currentIndex < this.quiz.questions.length - 1) {
					this.answeredQuestions++;					
					this.currentQuestion = this.quiz.questions[++this.currentIndex];
					this.progress = (this.answeredQuestions / this.quiz.questions.length) * 100;
				}
			};
			this.evaluate = () => {
				var question = this.quiz.questions[0];
				Quiz.evaluateQuestion(this.quiz._id, question.id, [question.options[0].id]).then(function(data) {
					console.log(data);
				});  
			}
		}
	}
});