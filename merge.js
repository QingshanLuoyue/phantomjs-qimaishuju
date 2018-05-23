var fs = require('fs')

var count = 0

var downloadNumPath = './tempdata/4-downloadNum.txt'
var finalDataPath = './tempdata/5-finalData.txt'

// var downloadNumObj = [];


var downloadReadTxt = fs.readFileSync(downloadNumPath, 'utf-8');
var finalDataReadTxt = fs.readFileSync(finalDataPath, 'utf-8');

var downloadMsgArr = downloadReadTxt.toString().replace(/\n$/, '').split('\n');
var finalDataMsgArr = finalDataReadTxt.toString().replace(/\n$/, '').split('\n');

var downloadParse = []
var finalDataParse = []

for (var i = 0; i < downloadMsgArr.length; i++) {
	var cur1 = JSON.parse(downloadMsgArr[i].toString())
	downloadParse.push(cur1)
}

for (var i = 0; i < finalDataMsgArr.length; i++) {
	var cur2 = JSON.parse(finalDataMsgArr[i].toString())
	cur2.sortNum = count++
	finalDataParse.push(cur2)
}

for (var i = 0; i < finalDataParse.length; i++) {
	for (var j = 0; j < downloadParse.length; j++) {
		if (finalDataParse[i].no === downloadParse[j].no) {
			finalDataParse[i].totalDownloadNum = downloadParse[j].totalDownloadNum
			break
		}
	}
}
// console.log('msgArr = ', finalDataParse)
exports.result = finalDataParse
