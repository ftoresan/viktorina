angular.module('viktorina').directive('quizManage', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/quiz/quiz-manage/quiz-manage.html',
		controllerAs: 'manageQuiz',
		controller : function($scope, $reactive, $state) {
			$reactive(this).attach($scope);
			
			this.helpers({
				quizzes: () => {
					return Quizzes.find({});
				}
			});
			this.createQuiz = () => {
				var id = Quizzes.insert({title: "New Quiz", questions: []});
				$state.go('edit', {id: id});
			};
			this.deleteQuiz = (id) => {
				Quizzes.remove({_id: id});
			};
		}
	}
});