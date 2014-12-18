var request = require('request');

// 推送请求URL
var requestURL = 'http://127.0.0.1:4567/pub';

/**
 * shell控制器, 展示输出
 *
 * @param   {string}  key  发送目标
 * @param   {string}  msg  发送消息内容
 */
function msgCallback(key, msg) {
	// 获取发送的Json字符串
	var jsonMessage = getJsonMessage('msg', msg);

	// 发送任务消息
	exec(key, jsonMessage);
}
exports.msgCallback = msgCallback;

/**
 * 任务事件发送函数
 *
 * @param   {string}  key        发送目标
 * @param   {string}  eventType  事件类型
 * @param   {string}  msg        发送消息体
 */
function eventCallback(key, eventType, msg) {
	// 获取发送的Json字符串
	var jsonMessage = getJsonMessage(eventType, msg);

	// 发送任务消息
	exec(key, jsonMessage);
}
exports.eventCallback = eventCallback;

//==================	Helper    ==========================

/**
 *	发送消息
 *
 * @param   {string}  key  发送目标
 * @param   {string}  msg  发送消息体
 */
function exec(key, msg) {
	// 表单
	var form = {
		key  : key,
		value: msg
	};

	// 发送消息
	request.post(
			{
				url : requestURL, 
				form: form
			}, 
			function(err,httpResponse,body){
				// 请求完成
				console.log(body);
			});
}


/**
 * 通过传入的参数，生成发送的Json字符串
 *
 * @param   {string}  eventType  事件类型
 * @param   {string}  msg        发送消息
 *
 * @return  {string}             Json字符串
 */
function getJsonMessage(eventType, msg) {
	// Json数据对象
	var jsonObj = {
		"type" : eventType,
		 "msg" : msg 
	};

	var jsonString = JSON.stringify(jsonObj);
	var obj = JSON.parse(jsonString)
	// console.log(obj);
	return jsonString;
}

