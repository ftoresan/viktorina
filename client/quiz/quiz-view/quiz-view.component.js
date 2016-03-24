angular.module('viktorina').directive('quizView', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/quiz/quiz-view/quiz-view.html',
		controllerAs: 'viewQuiz',
		controller : function($scope, $reactive, $state, $stateParams, Quiz) {
			$reactive(this).attach($scope);
					
			this.subscribe("quizzesView");
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
					if (!this.currentQuestion.checked) {
						this.evaluate(true);
					}
					
					this.answeredQuestions++;					
					this.answerStatus = null;
					this.answerStatusText = "";
					this.currentQuestion = this.quiz.questions[++this.currentIndex];
					this.progress = (this.answeredQuestions / this.quiz.questions.length) * 100;
				}
			};
			this.isLast = () => {
				return this.currentQuestion == this.quiz.questions[this.quiz.questions.length - 1];
			};
			
			this.evaluate = (silently) => {
				var question = this.currentQuestion;
				var options = question.type == Type.Single ? [question.answer] : [];
				var self = this;
				Quiz.evaluateQuestion(this.quiz._id, question.id, options).then(function(data) {
					question.checked = true;
					question.result = {
						result : data[0].result,
						correct : data[0].option
					}
					if (!silently) {
						self.answerStatus = data[0].result ? "success" : "warning";
						self.answerCorrect = data[0].option;
						self.answerStatusText = data[0].result ? "Your answer is correct!" : "Incorrect answer";
					} 
				});
			};
			
			this.showResults = () => {
				if (!this.currentQuestion.checked) {
					this.evaluate(true);
				}
				this.answerStatus = null;
				this.answerStatusText = "";
				this.showingResults = true;
			}
			
		}
	}
});