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
				var options = [];
				if (question.type == Type.Single) {
					options = [question.answer];
				} else {
					options = question.options.filter(function(o) {
						return o.answer;
					}).map(function(o) {
						return o.id;
					});
				}
				var self = this;
				Quiz.evaluateQuestion(this.quiz._id, question.id, options).then(function(data) {
					
					question.checked = true;
					if (question.type == Type.Single) {
						question.result = {
							result : data[0].result,
							correct : data[0].option
						}
						question.right = data[0].result;
						if (!silently) {
							self.answerStatus = data[0].result ? "success" : "warning";
							self.answerCorrect = data[0].option;
							self.answerStatusText = data[0].result ? "Your answer is correct!" : "Incorrect answer";
						} 
					} else {
						question.result = data;
						var correct = data.filter(function(o) {
							return o.result;
						});		
						question.right = correct.length == data.length;
						if (!silently) {
							self.answerStatus = correct.length == data.length ? "success" : "warning";
							self.answerStatusText = correct.length == data.length ? "Your answer is correct!" : "Incorrect answer";
						}
					}
					if (self.prepResults) {
						self.calcResults();
					}
				});
			};
			
			this.isCorrect = (question, option) => {
				if (question.type == Type.Single) {
					return option.id == question.result.correct.id;
				} else {
					return question.result.find(function(element) {
						return element.option == option.id;
					});
				}
			};
			
			this.isWrong = (question, option) => {
				if (question.type == Type.Single) {
					return option.id == question.answer && !this.isCorrect(question, option);
				} else {
					return !this.isCorrect(question, option) && option.answer;
				}					
			};
			
			this.retry = () => {
				this.quiz.questions.forEach(function(q) {
					q.result = null;
					q.answer = null;
					q.right = false;
					q.checked = false;
					q.options.forEach(function(o) {
						o.answer = null;
					})
				});
				this.prepResults = false;
				this.showingResults = false;
				this.answer();
			}
			
			this.showResults = () => {
				if (!this.currentQuestion.checked) {
					this.prepResults = true;
					this.evaluate(true);
				} else {
					this.calcResults();
				}				
				this.answerStatus = null;
				this.answerStatusText = "";
			};
			
			this.calcResults = () => {
				this.showingResults = true;
				this.totalQuestions = this.quiz.questions.length;
				this.totalCorrect  = this.quiz.questions.filter(function(q) { return q.right;}).length;
				this.finalScore = this.totalCorrect / this.totalQuestions * 100;
				this.finalScore = Math.round(this.finalScore * 100) / 100;
			}
			
		}
	}
});