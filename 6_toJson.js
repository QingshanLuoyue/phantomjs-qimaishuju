var fs = require('fs')

var finalMsgArr = []

var solveDataPath = require('./merge.js')

var writePath = './result/social.json'
// var writePath = './result/live.json'
// var writePath = './result/lianmai.json'
// var writePath = './result/game.json'
// var writePath = './result/edu.json'
// var writePath = './result/yiliao.json'
// var writePath = './result/callcenter.json'


fs.writeFileSync(writePath, JSON.stringify(solveDataPath))