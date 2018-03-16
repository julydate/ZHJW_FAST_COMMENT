// ==UserScript==
// @name         ZHJW_FAST_COMMENT
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  SCU教务系统快速评教插件（非一键评教）| 帮助你快速填写评价，免去繁琐的选项与文字输入 | 请不要使用“兼容模式”
// @author       Julydate
// @match        http://202.115.47.141/loginAction.do
// @match        http://zhjw.scu.edu.cn/loginAction.do
// @grant        none
// ==/UserScript==

(function() {
        //检测框架是否加载完成并注入脚本
        document.onreadystatechange = onFrameLoad;
        function onFrameLoad(){
            if(document.readyState == "complete"){
                showBox();
				insertScript();
            }
        }
		//注入评教框
        function showBox() {
            if (document.getElementsByTagName("frame")[0].contentWindow.document.getElementById("sp-pj-container") === null) {
                var setBox = document.getElementsByTagName("frame")[0].contentWindow.document.getElementsByTagName("table")[0];
                var Container = document.createElement('div');
                Container.id = "sp-pj-container";
                Container.style = "top: 10%;right: 10%;position: fixed !important;background-color: #0072ff59;padding: 5px;z-index: 9999999;";
                Container.innerHTML =
                    "<div id='sp-py-content' style='display: block;'> \n" +
                    "	<input type='button' value='1级' onclick='checkList(1)' /> \n" +
                    "	<input type='button' value='2级' onclick='checkList(2)' /> \n" +
                    "	<input type='button' value='3级' onclick='checkList(3)' /> \n" +
                    "	<input type='button' value='4级' onclick='checkList(4)' /> \n" +
                    "	<input type='button' value='5级' onclick='checkList(5)' /> \n" +
                    "	<input type='button' value='随机生成评价' onclick='writeComment()' /> \n" +
                    " 	<input type='button' value='提交' onclick='mainHtml.check()' /> \n" +
                    "</div> \n";
                setBox.appendChild(Container);
            }
        }
		//注入脚本
		function insertScript() {
			var jsBox = document.getElementsByTagName("frame")[0].contentWindow.document.getElementsByTagName("table")[0];
			var Scriptbox = document.createElement('script');
			Scriptbox.text =
					"//定义主运行位置 \n" +
					"var mainHtml = self.parent.document.getElementsByTagName('frame')[1].contentWindow.document.getElementsByName('mainFrame')[0].contentWindow; \n" +
					"//填写问卷内容 \n" +
					"function checkList(num) { \n" +
					"	var num \n" +
					"	if(num == '1')var numValue = '10_1'; \n" +
					"	if(num == '2')var numValue = '10_0.8'; \n" +
					"	if(num == '3')var numValue = '10_0.6'; \n" +
					"	if(num == '4')var numValue = '10_0.4'; \n" +
					"	if(num == '5')var numValue = '10_0.2'; \n" +
					"	var allInputs = mainHtml.document.getElementsByTagName('input'); \n" +
					"	for(var x = 0 ; x < allInputs.length ; x++) \n" +
					"		if(allInputs[x].value == numValue) \n" +
					"			allInputs[x].checked = true; \n" +
					"} \n" +
					"//填写主观评价 \n" +
					"function writeComment() { \n" +
					"	var comments = [ \n" +
					"		'热爱教学，用心经营教学，对所授课程有明确的目标，在教学活动中，充满爱心，言传身教，立德树人，传递正能量。', \n" +
					" 		'教学很好地激发了我的学习兴趣并调动了我的学习积极性，我在该课程学习中付出了最大努力。', \n" +
					"		'为我提供的学习资源以及引导我们自主寻找的学习资源，对我的学习帮助很大。', \n" +
					"		'精心设计课程的成绩评定办法和过程考核环节，激励我在整个学期中都努力学习。', \n" +
					"		'作业和考试后，针对我的学习情况给予了及时且有价值的反馈，这些反馈可以很好的帮助我了解如何改进学习。', \n" +
					"		'该门课程的总体授课效果令我很满意。', \n" +
					"		'对我的学习很有帮助', \n" +
					"		'非常认真负责而且善于沟通', \n" +
					"		'激发了我的学习兴趣并且能够清晰地解答我的疑问' \n" +
					"	] \n" +
					"	var commentText = comments[Math.floor(Math.random()*comments.length)]; \n" +
					"	var comment = mainHtml.document.getElementsByName('zgpj'); \n" +
					"	comment[0].value = commentText; \n" +
					"} \n";
					jsBox.appendChild(Scriptbox);
		}
})();