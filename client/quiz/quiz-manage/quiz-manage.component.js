angular.module('viktorina').directive('quizManage', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/quiz/quiz-manage/quiz-manage.html',
		controllerAs: 'manageQuiz',
		controller : function($scope, $reactive, $state) {
			$reactive(this).attach($scope);
			this.subscribe("quizzes");
			this.helpers({
				quizzes: () => {
					return Quizzes.find({});
				}
			});
			this.createQuiz = () => {
				var id = Quizzes.insert({title: "", questions: [], createdIn: new Date()});
				$state.go('edit', {id: id});
			};
			this.deleteQuiz = (id) => {
				Quizzes.remove({_id: id});
			};
		}
	}
});