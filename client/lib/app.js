$(function () {
	$.material.init();
	$.material.ripples();	
	$.material.radio();
	$.material.checkbox();
});

angular.module('viktorina', ['angular-meteor', 'ui.router', 'ui.bootstrap']);