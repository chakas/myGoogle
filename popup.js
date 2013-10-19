$(document).ready(function(){
	$('a[href="#openPopup"]').click(function(){
		chrome.tabs.create({url:'options.html'});
	}); 
});