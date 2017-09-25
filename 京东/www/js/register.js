/***************提交*****************/
$("form").submit(function(event){
	event.preventDefault();
	var pwdInputs = $("input[type = password]");
	if(pwdInputs[0].value != pwdInputs[1].value){
		$(".modal-body").text("密码不一致");
		$("#myModal").modal("show");
		return;
	}
	
	 var data = $(this).serialize();
    console.log(data);
    $.post("/user/register",data,function(resData){
    	$(".modal-body").text(resData.msg);
    	$("#myModal").modal("show").on("hide.bs.modal",function(){
    		if (resData.code == 1) {
    			location.href = "/login.html";
    		}
		})
	})
})
