angular.module('viktorina').directive('quizEdit', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/quiz/quiz-edit/quiz-edit.html',
		controllerAs: 'editQuiz',
		controller : function($scope, $reactive, $stateParams, $state) {
			$reactive(this).attach($scope);
			this.subscribe("quizzes");
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
				var question = {
					title: "New question", 
					type: Type.Single, 
					id : uuid.v1(),
					options: [{
						id : uuid.v1(),
						description: ""						
					}, {
						id : uuid.v1(),
						description: ""
					}]
				};
				this.quiz.questions.push(question);
				question.correct = question.options[0].id;
				this.selectQuestion(question);
			};
			this.selectQuestion = (question) => {
				this.currentQuestion = question;
			};
			
			this.addOption = () => {
				if (this.currentQuestion) {
					var option = {
						id: uuid.v1(),
						description: ""
					};
					this.currentQuestion.options.push(option);
				}	
			};
			
			this.removeOption = (index) => {
				this.currentQuestion.options.splice(index, 1);
			}
		}
	}
});