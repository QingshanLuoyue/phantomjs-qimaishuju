var fs = require('fs')
var jsonFormat = require('json-format');

var finalMsgArr = []

var solveDataPath = require('./merge.js').result

var writePath = './result/search.json'
// var writePath = './result/social.json'
// var writePath = './result/live.json'
// var writePath = './result/lianmai.json'
// var writePath = './result/game.json'
// var writePath = './result/edu.json'
// var writePath = './result/yiliao.json'
// var writePath = './result/callcenter.json'


var config = {
	type: 'space',
	size: 4
}

fs.writeFileSync(writePath, jsonFormat(solveDataPath, config));
// fs.writeFileSync(writePath, JSON.stringify(solveDataPath))