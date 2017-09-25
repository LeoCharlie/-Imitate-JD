$("#saoma").click(function(){
	$("#saoma").css({
		"color":"#E4393C"
	})
	$("#key").css({
		"display":"block"
	})
})
$("#zhanghu").click(function(){
	$("#saoma").css({
		"color":""
	})
	$("#zhanghu").css({
		"color":"#E4393C"
	})
	$("#key").css({
		"display":"none"
	})
})

//发送登陆请求
$("form").submit(function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post("/user/login",data,function(resData){
    		if (resData.code == 1) {
    			 location.href = "/JD.html";
    		}
    	    else{
    	    	alert("用户不存在");
    	    }
	})
})
