$(function(){
	$("#name").focus();
});
$("#loginbutton").click(function(){
	$("#loginbutton").attr("disabled","disabled");
	$("#loginbutton").val("正在登录");
	$(".admin_login dd .submit_btn").css("background-color","#537b73");
	var reg = /^\w{3,10}$/;
	var username = $("#name").val();
	var password = $("#pwd").val();
	if(!reg.test(username)){
//		$("#msg").html("请输入3到10位数字,字母或下划线");
		alert("请输入3到10位数字,字母或下划线")
		$("#loginbutton").removeAttr("disabled");
		$("#loginbutton").val("立即登录");
		$(".admin_login dd .submit_btn").css("background-color","#048f74");
		$("#name").val("");
		$("#pwd").val("");
		return;
	}
	if(!reg.test(password)){
//		$("#msg").html("请输入3到10位数字,字母或下划线");
		alert("请输入3到10位数字,字母或下划线")
		$("#loginbutton").removeAttr("disabled");
		$("#loginbutton").val("立即登录");
		$(".admin_login dd .submit_btn").css("background-color","#048f74");
		$("#pwd").val("");
		return;
	}
//	$("#msg").html("");
	
	var url = "user/login.do";
	//登錄
	$.ajax({
		type:"post",
		url:url,
		data:{"username":username,"password":password},
		dataType:"json",
		success:function(data){
//			$("#loginbutton").attr("disabled","");
//			$("#loginbutton").val("立即登录");
			if(data.state&&data.data&&data.data.length!=0){
				var eusername = getCookie("energyusername");
				if(eusername==null){
					addCookie("energyusername",username,2);
				}else{
					SetCookie("energyusername",username);
				}
				
				var ename = getCookie("energyname");
				if(ename==null){
					addCookie("energyname",data.data.name,2);
				}else{
					SetCookie("energyname",data.data.name)
				}
				
				var erid = getCookie("energyrid");
				if(erid==null){
					addCookie("energyrid",data.data.rid,2);
				}else{
					SetCookie("energyrid",data.data.rid);
				}
				
				var ebid = getCookie("energybid");
				if(ebid==null){
					addCookie("energybid",data.data.bid,2);
				}else{
					SetCookie("energybid",data.data.bid);
				}
				
				window.location.href = "main.html";
			}else{
				alert("用户名或密码错误");
				$("#loginbutton").removeAttr("disabled");
				$("#loginbutton").val("立即登录");
				$(".admin_login dd .submit_btn").css("background-color","#048f74");
			}
		},
		error:function(){
			alert("登录失败");
			$("#loginbutton").removeAttr("disabled");
			$("#loginbutton").val("立即登录");
			$(".admin_login dd .submit_btn").css("background-color","#048f74");
			$("#name").val("");
			$("#pwd").val("");
		}
	});
});

