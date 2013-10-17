$(document).ready(function(){
 if(window.location.href.indexOf("google")>-1){	
		var logoid = document.getElementById("hplogo");
		console.log(logoid);
		$("#pagelet_ego_pane").remove();
		$('canvas#hplogoc').remove();
		$("#hplogo").text("");
		chrome.storage.local.get('imgHexaData',function(data){
		
		//In google.com there is no div tag where as in the india domain we have div tag	
		if($("#hplogo")[0].tagName == 'IMG'){
		
			$("#hplogo").attr('src',data['imgHexaData']);
		}
		else if($("#hplogo")[0].tagName == 'DIV'){
        		$("#hplogo").css('background-image', 'url(' + data['imgHexaData'] + ')');
            		$("#hplogo").css('background-size', "360px 90px");
		}
    	//	$("#hplogo").css('background-image', 'url(' + data['imgHexaData'] + ')');
    	//	$("#hplogo").css('background-size',"360px 90px");
    	});
	}
});
