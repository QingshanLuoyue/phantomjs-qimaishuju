var fs = require('fs')
var jsonFormat = require('json-format');

var finalMsgArr = []

// var solveDataPath = require('./merge.js').result
var solveDataPath = './tempdata/5-finalData.txt'

var writePath = './result/search.json'
// var writePath = './result/social.json'
// var writePath = './result/live.json'
// var writePath = './result/lianmai.json'
// var writePath = './result/game.json'
// var writePath = './result/edu.json'
// var writePath = './result/yiliao.json'
// var writePath = './result/callcenter.json'

result = fs.readFileSync(solveDataPath, { encoding: "utf-8" }).toString().replace(/\n$/, '').split('\n')
for (let index = 0; index < result.length; index++) {
	result[index] = JSON.parse(result[index])  
	console.log(result[index])
}
// console.log(result)

var config = {
	type: 'space',
	size: 4
}

fs.writeFileSync(writePath, jsonFormat(result, config));
// fs.writeFileSync(writePath, JSON.stringify(solveDataPath))
console.log('生成数据完毕！')