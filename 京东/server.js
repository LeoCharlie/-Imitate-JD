var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs")
var cookieParser = require("cookie-parser");

var app = express();
app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

/***********注册***************/
app.post("/user/register",function(req,res){
	//判断是不是被注册过
	var filePath = "users/" + req.body.username + ".json";
	fs.exists(filePath,function(exi){
		if(exi){
			res.status(200).json({code:2,msg:"该用户名已被注册"});
		}else{
			req.body.ip = req.ip;
			req.body.time = new Date();
			console.log(req.body);
			fs.writeFile(filePath,JSON.stringify(req.body),function(err){
				if (err) {
					res.status(200).json({code:0,msg:"注册失败"})
				} else{
					res.status(200).json({code:1,msg:"注册成功"})
				}
			})
		}
	})
})

/********************登录*****************/
app.post("/user/login",function(req,res){
	var filePath = "users/" + req.body.username + ".json";
	fs.exists(filePath,function(exi){
		if (exi) {
			fs.readFile(filePath,function(err,data){
				if (err) {
					res.status(200).json({code:2,msg:"此账号不存在"})
				} else{
					var user =JSON.parse(data);
					if (req.body.password == user.password) {
						var time = new Date();
						time.setMonth(time.getMonth()+1);
						res.cookie("username",req.body.username,{expires:time});
						res.status(200).json({code:1,msg:"登录成功"});
						
					} else{
						res.status(200).json({code:3,msg:"密码错误"});
					}
				}
			})
		} else{
			res.status(200).json({code:0,msg:"此用户不存在"});
		}
	})
})

/*************退出登录*****************/
app.post("/user/logout",function(req,res){
	//清除cookie中的username(access_token、timestamp)
	res.clearCookie("username");
	res.status(200).json({code:1,msg:"退出登录"});
})




app.listen(3000,function(){
	console.log("server is running");
})
