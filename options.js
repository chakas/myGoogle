//All global variables go here
var ctx = $('#canvasid')[0].getContext("2d");
var x = 5;
var y = 10;
var lastNum = 0;
var arr_color = ['#3369E8', '#D50F25', '#EEB211', '#009925'];
var is3d=false;

//this function is used for saving the user choice to display logo
function toggling(usrval){
chrome.storage.local.set({'overwrite':usrval},function(){console.log('overwrite is saved')});	
}

//function to redraw google image in Canvas
function drawCanvas(pos, text) {
    var indx = (pos / 4).toString();
    ctx.font = "Bold 90pt " + $("#selectFont").val();
    if (indx.indexOf(".25") > -1) {
        ctx.fillStyle = arr_color[0];
        ctx.fillText(text, x, 100);
        x += ctx.measureText(text).width;
        ctx.restore();
    } else if (indx.indexOf(".5") > -1) {
        ctx.fillStyle = arr_color[1];
        ctx.fillText(text, x, 100);
        x += ctx.measureText(text).width;
        ctx.restore();
    } else if (indx.indexOf(".75") > -1) {
        ctx.fillStyle = arr_color[2];
        ctx.fillText(text, x, 100);
        x += ctx.measureText(text).width;
        ctx.restore();
    } else {
        ctx.fillStyle = arr_color[3];
        ctx.fillText(text, x, 100);
        x += ctx.measureText(text).width;
        ctx.restore();
    }
}
//Will initiate our process over here
var el = document.getElementById("usrBtn");
el.addEventListener('click', function () {
    //console.log($("#usrTxt").val());
    var data = $("#usrTxt").val();
    data.trim(/^\s+|\s+$/g,'');
    if(data.length > 0 && data.length < 9){
            var datArr = data.split('');
            ctx.clearRect(0, 0, 700, 700);
            x = 5;
            y = 10;
            for (i = 1; i <= datArr.length; i++) {
                //console.log(datArr[i-1])
                drawCanvas(i, datArr[i - 1]);
            }
            $("#imgBtn").show();
    }
    else{
            $("#imgBtn").hide();
                alert("No of characters should be less than nine");
            
    }

});

var imgEl = document.getElementById("imgBtn");
imgEl.addEventListener('click', function () {
    //localStorage.setItem("imgHexaData",$('#canvasid')[0].toDataURL("image/png"));
    chrome.storage.local.set({
        'imgHexaData': $('#canvasid')[0].toDataURL("image/png")
    }, function () {
        // Notify that we saved.
        $('#status').text("Image Saved!!!").fadeIn('slow').delay(3000).fadeOut('slow');
        toggling(false);
    });


});

// preview the data
var prvwEl = document.getElementById("prevBtn");
prvwEl.addEventListener('click', function () {
    chrome.storage.local.get('imgHexaData' , function (imgdata) {
    	ctx.clearRect(0, 0, 700, 700);
    	var image = new Image();
		image.src = imgdata.imgHexaData;
		image.onload = function() {
    		ctx.drawImage(image, 5, 10);
		};
    });
});

 function draw3dText(context, text, x, y, textDepth){
        var n;
        for (n = 0; n < textDepth; n++) {
           context.fillText(text, x - n, y - n);
        }
       context.fillStyle = "#5E97FF";
       context.shadowColor = "black";
       context.shadowBlur = 10;
       context.shadowOffsetX = textDepth + 2;
       context.shadowOffsetY = textDepth + 2;
       context.fillText(text, x - n, y - n);
}

$('#checkbox').change(function(){
    is3d = this.checked ? true : false;
    toggling(is3d);
    
});
