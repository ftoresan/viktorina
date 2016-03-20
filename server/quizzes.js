Meteor.publish("quizzes", function() {
	return Quizzes.find({});
});

Meteor.publish("quizzesView", function() {
	return Quizzes.find({}, { 
		fields : {
			"questions.options.correct": 0, 
			"questions.correct": 0
		}
	});
});